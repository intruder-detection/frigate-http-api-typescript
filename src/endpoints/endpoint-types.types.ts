import { ManagementAndInformation } from './app.enum';
import { FFProbeQueryParameters } from './query-params/app/ffprobe.interface';
import { StatsResponse } from './responses/app/stats.interface';
import { ConfigResponse } from './responses/app/config.interface';
import { FFprobeResponse } from './responses/app/ffprobe.interface';
import { RestartResponse } from './responses/app/restart.interface';
import { Media } from './media';
import { MJPEGDebugStream } from './query-params/media/mjpeg-stream.interface';
import * as Stream from 'node:stream';
import { LatestJPG } from './query-params/media/latest-jpg.interface';
import { GridJPG } from './query-params/media/grid-jpg.interface';
import { Events } from './events.enum';
import { EventsQueryParams } from './query-params/events/events.interface';
import { EventsResponse } from './responses/events/events.interface';
import { EventsSummaryResponse } from './responses/events/events-summary.interface';
import { EventsByIDResponse } from './responses/events/events-by-id.interface';
import { DeleteResponse } from './responses/delete-response.interface';
import { PostResponse } from './responses/post-response.interface';
import { IdPlus } from './query-params/events/id-plus.interface';
import { SubLabelBody } from './body/events/sub-label.interface';
import { ThumbnailJPG } from './query-params/events/thumbnail-jpg.interface';
import { SnapshotCleanPng } from './query-params/events/snapshot-clean-png.interface';
import { SnapshotJPG } from './query-params/events/snapshot-jpg.interface';
import { CreateLabel } from './body/events/create-label.interface';
import { CreateLabelResponse } from './responses/events/create-label.interface';
import { PutResponse } from './responses/put-response.interface';
import { Preview } from './preview.enum';
import { MetaDataForPreviewsInRangeUrlParams } from './url-params/previews/metadata-for-previews-in-range.interface';
import { CameraAndEventIdUrlParams } from './url-params/camera-and-event-id-url-params.interface';
import { CameraAndLabelNameUrlParams } from './url-params/camera-and-label-name-url-params.interface';
import { CameraNameUrlParams } from './url-params/camera-name-url-params.interface';
import { EventIdUrlParams } from './url-params/event-id-url-params.interface';
import { MetaDataForPreviewsInHourUrlParams } from './url-params/previews/metadata-for-previews-in-hour.interface';
import { MetaDataFrameUrlParams } from './url-params/previews/metadata-frame-url-params.interface';
import { GifFromPreviewUrlParams } from './url-params/previews/gif-from-preview-url-params.interface';
import { Recordings } from './recordings.enum';
import { LivestreamUrlHourUrlParamsInterface } from './url-params/recordings/livestream-url-hour-url-params.interface';
import { LivestreamInRangeUrlParams } from './url-params/recordings/livestream-in-range-url-params.interface';
import {
  ExportTimeRangeMp4ToDiskUrlParams
} from './url-params/recordings/export-time-range-mp4-to-disk-url-params.interface';
import { ExportTimeRangeMp4Body } from './body/recordings/time-range-mp4.interface';

/**
 * API Functions Mapping.
 */
// GET
export interface FrigateApiGetEndpointsMapping {
  // Management && Information
  [ManagementAndInformation.Config]: {
    urlParams: undefined;
    queryParams: undefined;
    response: ConfigResponse;
  };
  [ManagementAndInformation.Stats]: {
    urlParams: undefined;
    queryParams: undefined;
    response: StatsResponse;
  };
  [ManagementAndInformation.Version]: {
    urlParams: undefined;
    queryParams: undefined;
    response: string;
  };
  [ManagementAndInformation.FFProbe]: {
    urlParams: undefined;
    queryParams: FFProbeQueryParameters;
    response: {
      [key: string]: FFprobeResponse;
    };
  };
  [ManagementAndInformation.CameraPTZInfo]: {
    urlParams: CameraNameUrlParams;
    queryParams: undefined;
    response: any; // TODO: Use Camera with PTZ info to see possible response type
  };
  // Camera Media
  [Media.MJPEGDebugStream]: {
    urlParams: CameraNameUrlParams;
    queryParams: MJPEGDebugStream;
    response: Stream;
  };
  [Media.LatestJPG]: {
    urlParams: CameraNameUrlParams;
    queryParams: LatestJPG;
    response: string;
  };
  [Media.ThumbnailJPG]: {
    urlParams: CameraAndLabelNameUrlParams;
    queryParams: undefined;
    response: string;
  };
  [Media.ClipMP4]: {
    urlParams: CameraAndLabelNameUrlParams;
    queryParams: undefined;
    response: string;
  };
  [Media.SnapshotJPG]: {
    urlParams: CameraAndLabelNameUrlParams;
    queryParams: undefined;
    response: string;
  };
  [Media.GridJPG]: {
    urlParams: CameraNameUrlParams;
    queryParams: GridJPG;
    response: string;
  };
  [Media.CameraAndEventJGPSnapShot]: {
    urlParams: CameraAndEventIdUrlParams;
    queryParams: undefined;
    response: string;
  };
  // Events
  [Events.Events]: {
    urlParams: undefined;
    queryParams: EventsQueryParams;
    response: EventsResponse[];
  };
  [Events.EventsSummary]: {
    urlParams: undefined;
    queryParams: undefined;
    response: EventsSummaryResponse;
  };
  [Events.ById]: {
    urlParams: EventIdUrlParams;
    queryParams: undefined;
    response: EventsByIDResponse;
  };
  [Events.ThumbnailJPG]: {
    urlParams: EventIdUrlParams;
    queryParams: ThumbnailJPG;
    response: Uint8Array;
  };
  [Events.ClipMp4]: {
    urlParams: EventIdUrlParams;
    queryParams: undefined;
    response: Uint8Array;
  };
  [Events.SnapshotCleanPNG]: {
    urlParams: EventIdUrlParams;
    queryParams: SnapshotCleanPng;
    response: string;
  };
  [Events.SnapshotJPG]: {
    urlParams: EventIdUrlParams;
    queryParams: SnapshotJPG;
    response: string;
  };
  // Previews
  [Preview.Gif]: {
    urlParams: EventIdUrlParams;
    queryParams: undefined;
    response: any; // TODO: Verify
  };
  [Preview.MetadataForPreviewsInRange]: {
    urlParams: MetaDataForPreviewsInRangeUrlParams;
    queryParams: undefined;
    response: any; // TODO: Verify
  };
  [Preview.MetadataForPreviewsInHour]: {
    urlParams: MetaDataForPreviewsInHourUrlParams;
    queryParams: undefined;
    response: any; // TODO: Verify
  };
  [Preview.Frame]: {
    urlParams: MetaDataFrameUrlParams;
    queryParams: undefined;
    response: any; // TODO: Verify
  };
  [Preview.GifFromPreview]: {
    urlParams: GifFromPreviewUrlParams;
    queryParams: undefined;
    response: any; // TODO: Verify
  };
  // Recordings
  [Recordings.LiveStreamURLHour]: {
    urlParams: LivestreamUrlHourUrlParamsInterface;
    queryParams: undefined;
    response: any; // TODO: Verify
  };
  [Recordings.LiveStreamURLEvent]: {
    urlParams: EventIdUrlParams;
    queryParams: undefined;
    response: any; // TODO: Verify
  };
  [Recordings.LiveStreamURLTimeRange]: {
    urlParams: LivestreamInRangeUrlParams;
    queryParams: undefined;
    response: any; // TODO: Verify
  };
}

// POST
export interface FrigateApiPostEndpointsMapping {
  // Management && Information
  [ManagementAndInformation.Restart]: {
    urlParams: undefined;
    queryParams: undefined;
    body: undefined;
    response: RestartResponse;
  };
  // Events
  [Events.IdRetain]: {
    urlParams: EventIdUrlParams;
    queryParams: undefined;
    body: undefined;
    response: PostResponse;
  };
  [Events.SubmitForFrigatePlus]: {
    urlParams: EventIdUrlParams;
    queryParams: IdPlus;
    body: undefined;
    response: PostResponse;
  };
  [Events.SubmitForFrigatePlusFalsePositive]: {
    urlParams: EventIdUrlParams;
    queryParams: undefined;
    body: undefined;
    response: PostResponse;
  };
  [Events.SubLabel]: {
    urlParams: EventIdUrlParams;
    queryParams: undefined;
    body: SubLabelBody;
    response: PostResponse;
  };
  [Events.CreateLabel]: {
    urlParams: CameraAndLabelNameUrlParams;
    queryParams: undefined;
    body: CreateLabel;
    response: CreateLabelResponse;
  };
  // Recordings
  [Recordings.ExportTimeRangeMP4ToDisk]: {
    urlParams: ExportTimeRangeMp4ToDiskUrlParams;
    queryParams: undefined;
    body?: ExportTimeRangeMp4Body;
    response: PostResponse;
  };
}

// PUT
export interface FrigateApiPutEndpointsMapping {
  [Events.EndEvent]: {
    urlParams: EventIdUrlParams;
    queryParams: undefined;
    body: undefined;
    response: PutResponse;
  };
}

// DELETE
export interface FrigateApiDeleteEndpointsMapping {
  // Events
  [Events.ById]: {
    urlParams: EventIdUrlParams;
    queryParams: undefined;
    response: DeleteResponse;
  };
  [Events.IdRetain]: {
    urlParams: EventIdUrlParams;
    queryParams: undefined;
    response: DeleteResponse;
  };
}
