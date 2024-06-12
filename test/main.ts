import { FrigateHTTPAPI } from '../src/frigate-http-api';
import { ManagementAndInformation } from '../src/endpoints/app.enum';
import { Media } from '../src/endpoints/media';
import * as path from 'node:path';
import * as fs from 'node:fs';
import * as Stream from 'node:stream';
import { Events } from '../src/endpoints/events.enum';
import { Recordings } from '../src/endpoints/recordings.enum';
import { Exports } from '../src/endpoints/exports.enum';
import { Timeline } from '../src/endpoints/timeline.enum';
import { Reviews } from '../src/endpoints/reviews.enum';

const defaultCameraName = 'reolink_duo_2_wifi';

const defaultEventId = '1718036218.556791-faihjk';

const defaultOutputDir = '/tmp/test_frigate';

const cameraNameUrlParams = {
  camera_name: defaultCameraName,
};

async function managementAndInformation() {
  // Management && Information
  const config = await FrigateHTTPAPI.get(ManagementAndInformation.Config);
  console.log(config.mqtt.client_id);
  const stats = await FrigateHTTPAPI.get(ManagementAndInformation.Stats);
  console.log(stats.cpu_usages);
  const version = await FrigateHTTPAPI.get(ManagementAndInformation.Version);
  console.log(version);

  const ffprobe = await FrigateHTTPAPI.get(ManagementAndInformation.FFProbe, undefined, { paths: 'reolink_duo_2_wifi' });
  console.log(ffprobe[0]);

  const ptzinfo = await FrigateHTTPAPI.get(ManagementAndInformation.CameraPTZInfo, cameraNameUrlParams);
  console.log(ptzinfo);

  // const restart = await FrigateHTTPAPI.post(ManagementAndInformation.Restart);
  // console.log(restart.message);
}

async function media() {
  async function writeMPEGStreamToDisk(response: Stream, outputDir: string = defaultOutputDir) {
    let frameBuffer = [];
    let frameCount = 0;

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    response.on('data', (chunk) => {
      console.log('received data from stream');

      frameBuffer.push(chunk);

      const chunkStr = chunk.toString('binary');
      const delimiter = '\r\n--frame\r\n';

      let delimiterIndex = -1;

      while ((delimiterIndex = chunkStr.indexOf(delimiter)) !== -1) {
        const frameData = Buffer.concat(frameBuffer);
        const frameEnd = frameData.indexOf(delimiter, delimiterIndex);

        if (frameEnd === -1) break;

        const frame = frameData.slice(0, frameEnd);
        const frameStart = frame.indexOf('\r\n\r\n') + 4; // Skip the headers
        const jpegFrame = frame.slice(frameStart);

        const frameFileName = path.join(outputDir, `frame-${frameCount}.jpg`);
        fs.writeFileSync(frameFileName, jpegFrame);

        frameBuffer = [frameData.slice(frameEnd + delimiter.length)];
        frameCount++;
      }
    });
  }

  const debugStream = await FrigateHTTPAPI.get(
    Media.MJPEGDebugStream,
    cameraNameUrlParams,
    {
      fps: 10,
      h: 300,
      timestamp: 1,
    },
    'stream',
  );

  // void writeMPEGStreamToDisk(debugStream);

  async function latestJPGForMultipleQualities(outputDir: string = defaultOutputDir) {
    const qualities = Array(10)
      .fill(3)
      .map((_, i) => (i + 1) * 10);
    const heights = [300, 500, 1000, 2000, undefined];
    const qualityParameters = qualities
      .map((quality) =>
        heights.map((h) => ({
          quality,
          h,
        })),
      )
      .flat();

    console.time('latestJPGForMultipleQualities');

    const allJpegResponses = await Promise.all(
      qualityParameters.map((qualityParams) => FrigateHTTPAPI.get(Media.LatestJPG, cameraNameUrlParams, qualityParams, 'arraybuffer')),
    );
    allJpegResponses.map((jpegData, idx) => {
      const fileName = `jpeg_${qualityParameters[idx].quality}_${qualityParameters[idx].h ?? 'original_h'}.jpg`;
      fs.writeFileSync(path.join(outputDir, fileName), jpegData);
    });

    console.timeEnd('latestJPGForMultipleQualities');
  }

  async function thumbnailJPG(outputDir: string = defaultOutputDir) {
    const thumbnailJPG = await FrigateHTTPAPI.get(
      Media.ThumbnailJPG,
      {
        ...cameraNameUrlParams,
        label: 'person',
      },
      undefined,
      'arraybuffer',
    );
    fs.writeFileSync(path.join(outputDir, 'thumbnail.jpg'), thumbnailJPG);
  }

  async function clipMP4(outputDir: string = defaultOutputDir) {
    const clipMP4 = await FrigateHTTPAPI.get(
      Media.ClipMP4,
      {
        ...cameraNameUrlParams,
        label: 'person',
      },
      undefined,
      'arraybuffer',
    );
    fs.writeFileSync(path.join(outputDir, 'clip.mp4'), clipMP4);
  }

  async function snapshotJPG(outputDir: string = defaultOutputDir) {
    const snapshotJPG = await FrigateHTTPAPI.get(
      Media.SnapshotJPG,
      {
        ...cameraNameUrlParams,
        label: 'person',
      },
      undefined,
      'arraybuffer',
    );
    fs.writeFileSync(path.join(outputDir, 'snapshot.jpg'), snapshotJPG);
  }

  async function gridJPG(outputDir: string = defaultOutputDir) {
    const gridJPG = await FrigateHTTPAPI.get(Media.GridJPG, cameraNameUrlParams, undefined, 'arraybuffer');
    fs.writeFileSync(path.join(outputDir, 'grid.jpg'), gridJPG);
  }

  async function cameraAndEventJGPSnapShot(outputDir: string = defaultOutputDir) {
    const cameraAndEventJGPSnapShot = await FrigateHTTPAPI.get(
      Media.CameraAndEventJGPSnapShot,
      {
        ...cameraNameUrlParams,
        event_id: defaultEventId,
      },
      undefined,
      'arraybuffer',
    );
    fs.writeFileSync(path.join(outputDir, 'camera_and_event_snapshot.jpg'), cameraAndEventJGPSnapShot);
  }

  // Media.LatestJPG
  // await latestJPGForMultipleQualities();

  // Media.ThumbnailJPG
  // await thumbnailJPG();

  // Media.ClipMP4
  // await clipMP4();

  // Media.SnapshotJPG
  // await snapshotJPG();

  // Media.GridJPG
  // await gridJPG();

  // Media.CameraAndEventJGPSnapShot
  // await cameraAndEventJGPSnapShot();
}

async function events() {
  const events = await FrigateHTTPAPI.get(Events.Events, undefined, {
    limit: 5,
  });
  console.log(events[0].id);

  const eventsSummary = await FrigateHTTPAPI.get(Events.EventsSummary);
  console.log(eventsSummary);

  const eventById = await FrigateHTTPAPI.get(Events.ById, {
    event_id: defaultEventId,
  });
  console.log(eventById);

  // const deleteEventById = await FrigateHTTPAPI.delete(Events.ById, {
  //   event_id: defaultEventId,
  // });
  // console.log(deleteEventById);

  const retainById = await FrigateHTTPAPI.post(Events.IdRetain, {
    event_id: defaultEventId,
  });
  console.log(retainById);

  // Frigate+
  // const submitForFrigatePlus = await FrigateHTTPAPI.post(
  //   Events.SubmitForFrigatePlus,
  //   {
  //     event_id: defaultEventId,
  //   },
  //   { include_annotation: 1 },
  // );
  // console.log(submitForFrigatePlus);
  //
  // const submitForFrigatePlusFalsePositive = await FrigateHTTPAPI.post(Events.SubmitForFrigatePlusFalsePositive, {
  //   event_id: defaultEventId,
  // });
  // console.log(submitForFrigatePlusFalsePositive);

  const subLabel = await FrigateHTTPAPI.post(
    Events.SubLabel,
    {
      event_id: defaultEventId,
    },
    undefined,
    {
      subLabel: 'random',
      subLabelScore: 0.99,
    },
  );
  console.log(subLabel);

  const thumbnailJPG = await FrigateHTTPAPI.get(
    Events.ThumbnailJPG,
    {
      event_id: defaultEventId,
    },
    {
      format: 'android',
    },
    'arraybuffer',
  );
  fs.writeFileSync(path.join(defaultOutputDir, 'event_thumbnail.jpg'), thumbnailJPG);

  // const clipMp4 = await FrigateHTTPAPI.get(
  //   Events.ClipMp4,
  //   {
  //     event_id: defaultEventId,
  //   },
  //   undefined,
  //   'arraybuffer',
  // );
  // fs.writeFileSync(path.join(defaultOutputDir, 'event_clip.mp4'), clipMp4);

  // const snapshotCleanPng = await FrigateHTTPAPI.get(
  //   Events.SnapshotCleanPNG,
  //   {
  //     event_id: defaultEventId,
  //   },
  //   { download: true },
  //   'arraybuffer',
  // );
  // fs.writeFileSync(path.join(defaultOutputDir, 'snapshot-clean.png'), snapshotCleanPng);

  // const snapshotJPG = await FrigateHTTPAPI.get(
  //   Events.SnapshotJPG,
  //   {
  //     event_id: defaultEventId,
  //   },
  //   {
  //     h: 300,
  //   },
  //   'arraybuffer',
  // );
  // fs.writeFileSync(path.join(defaultOutputDir, 'snapshot.jpg'), snapshotJPG);

  // Events.CreateLabel
  // const createLabel = await FrigateHTTPAPI.post(
  //   Events.CreateLabel,
  //   {
  //     camera_name: defaultCameraName,
  //     label: 'person',
  //   },
  //   undefined,
  // );
  // console.log(createLabel);

  const endEvent = await FrigateHTTPAPI.put(
    Events.EndEvent,
    {
      event_id: defaultEventId,
    },
    undefined,
  );
  console.log(endEvent);
}

async function previews() {
  // event_id: 1717972821.878462-pq41sy
  // const gifOfEvent = await FrigateHTTPAPI.get(
  //   Preview.Gif,
  //   { event_id: '1717972821.878462-pq41sy' },
  //   undefined,
  //   'arraybuffer',
  // );
  // fs.writeFileSync(path.join(defaultOutputDir, 'snapshot.jpg'), gifOfEvent);
}

async function exportsTests() {
  // Exports.ExportTimeRangeMp4ToDisk
  // const exportTimRangeToDisk = await FrigateHTTPAPI.post(
  //   Exports.ExportTimeRangeMP4ToDisk,
  //   {
  //     ...cameraNameUrlParams,
  //     start_timestamp: (new Date(Date.now() - 30 * 60 * 1000).getTime() / 1000),
  //     end_timestamp: (new Date().getTime() / 1000),
  //   },
  //   undefined,
  //   {
  //     playback: 'timelapse_25x',
  //     name: 'Export 101',
  //   }
  // );
  // console.log(exportTimRangeToDisk);

  // Exports.ListExports
  const listOfExports = await FrigateHTTPAPI.get(Exports.ListExports);
  console.log(listOfExports[0].video_path);

  // const deleteExportById = await FrigateHTTPAPI.delete(Exports.DeleteExportById, {
  //   export_id: 'reolink_duo_2_wifi_ggg1iw',
  // });
  // console.log(deleteExportById);

  // const renameExport = await FrigateHTTPAPI.patch(Exports.RenameExport, {
  //   export_id: 'reolink_duo_2_wifi_oml4cx',
  //   export_name_new: 'my_export_name'
  // });
  // console.log(renameExport);
}

async function recordings() {
  // Recordings.LiveStreamURLHour
  // const liveStreamURLHour = await FrigateHTTPAPI.get(
  //   Recordings.LiveStreamURLHour,
  //   {
  //     ...cameraNameUrlParams,
  //     year: 2024,
  //     month: 6,
  //     day: 10,
  //     hour: 22,
  //     timezone: 'Europe/Lisbon',
  //   },
  //   undefined,
  //   'arraybuffer',
  // );
  // console.log(liveStreamURLHour);

  const recordingsPerHourSummary = await FrigateHTTPAPI.get(Recordings.HourlySummaryRecordings, cameraNameUrlParams);
  console.log(recordingsPerHourSummary[0].hours[0].hour);

  const segmentDetailsForRange = await FrigateHTTPAPI.get(Recordings.RecordingSegmentsForRange, cameraNameUrlParams, {
    after: new Date(Date.now() - 30 * 60 * 1000).getTime() / 1000,
    before: new Date().getTime() / 1000,
  });
  console.log(segmentDetailsForRange);

  const snapshotPNGSpecificFrame = await FrigateHTTPAPI.get(
    Recordings.SnapshotPNGSpecificFrame,
    {
      ...cameraNameUrlParams,
      frame_time: 1718134666,
    },
    undefined,
    'arraybuffer',
  );
  fs.writeFileSync(path.join(defaultOutputDir, 'snapshot-specific-frame.png'), snapshotPNGSpecificFrame);
}

async function timeline() {
  const timelineEvents = await FrigateHTTPAPI.get(Timeline.Timeline, undefined, {
    camera: defaultCameraName,
    limit: 5,
  });
  console.log(timelineEvents);
}

async function reviews() {
  const listReviews = await FrigateHTTPAPI.get(Reviews.ListReviews, undefined, {
    cameras: defaultCameraName,
    limit: 5,
  });
  console.log(listReviews);

  const getReviewById = await FrigateHTTPAPI.get(Reviews.GetReviewById, {
    review_id: '1718181382.406358-6aywc4',
  });
  console.log(getReviewById);

  const getReview = await FrigateHTTPAPI.get(Reviews.GetReviewById, {
    review_id: '1718181382.406358-6aywc4',
  });
  console.log(getReview);

  const summaryLast30Days = await FrigateHTTPAPI.get(Reviews.SummaryLast30Days, undefined, {
    cameras: defaultCameraName,
  });
  console.log(summaryLast30Days);

  const markViewedMany = await FrigateHTTPAPI.post(Reviews.MarkViewedMany, undefined, undefined, {
    ids: ['1718181382.406358-6aywc4'],
  });
  console.log(markViewedMany);

  const deleteReviewedMany = await FrigateHTTPAPI.post(Reviews.DeleteReviewedMany, undefined, undefined, {
    ids: ['1718185273.423603-zdt64y'],
  });
  console.log(deleteReviewedMany);

  const markReviewedById = await FrigateHTTPAPI.delete(Reviews.MarkReviewedById, {
    review_id: '1718181382.406358-6aywc4',
  });
  console.log(markReviewedById);

  const motionActivityForPeriod = await FrigateHTTPAPI.get(Reviews.MotionActivityForPeriod, undefined, {
    after: new Date(Date.now() - 30 * 60 * 1000).getTime() / 1000,
    before: new Date().getTime() / 1000,
    scale: 100,
  });
  console.log(motionActivityForPeriod);

  const audioActivityForPeriod = await FrigateHTTPAPI.get(Reviews.AudioActivityForPeriod, undefined, {
    after: new Date(Date.now() - 30 * 60 * 1000).getTime() / 1000,
    before: new Date().getTime() / 1000,
    scale: 60,
  });
  console.log(audioActivityForPeriod);
}

async function main() {
  await managementAndInformation();
  // await media();
  // await events();
  // await previews();
  // await exportsTests();
  // await recordings();
  // await timeline();
  // await reviews();
}

void main();
