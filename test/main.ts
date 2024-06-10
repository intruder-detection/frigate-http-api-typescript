import { FrigateHTTPAPI } from '../src/frigate-http-api';
import { ManagementAndInformation } from '../src/endpoints/app.enum';
import { Media } from '../src/endpoints/media';
import * as path from 'node:path';
import * as fs from 'node:fs';
import * as Stream from 'node:stream';

const defaultCameraName = 'reolink_duo_2_wifi';

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

  const ptzinfo = await FrigateHTTPAPI.get(ManagementAndInformation.CameraPTZInfo, {
    camera_name: defaultCameraName,
  });
  console.log(ptzinfo);

  // const restart = await FrigateHTTPAPI.post(ManagementAndInformation.Restart);
  // console.log(restart.message);
}

async function media() {
  async function writeMPEGStreamToDisk(response: Stream, outputDir: string = '/tmp/test_stream') {
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
    {
      camera_name: defaultCameraName,
    },
    {
      fps: 10,
      h: 300,
      timestamp: 1,
    },
    true,
  );
  // void writeMPEGStreamToDisk(debugStream);
}

async function main() {
  await managementAndInformation();
  await media();
}

void main();
