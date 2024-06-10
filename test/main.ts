import { FrigateHTTPAPI } from '../src/frigate-http-api';
import { ManagementAndInformation } from '../src/endpoints/app.enum';

async function main() {
  const config = await FrigateHTTPAPI.get(ManagementAndInformation.Config);
  console.log(config.mqtt.client_id);
  const stats = await FrigateHTTPAPI.get(ManagementAndInformation.Stats);
  console.log(stats.cpu_usages);
  const version = await FrigateHTTPAPI.get(ManagementAndInformation.Version);
  console.log(version);

  const ffprobe = await FrigateHTTPAPI.get(ManagementAndInformation.FFProbe, undefined, { paths: 'reolink_duo_2_wifi' });
  console.log(ffprobe[0]);

  const ptzinfo = await FrigateHTTPAPI.get(ManagementAndInformation.CameraPTZInfo, {
    camera_name: 'reolink_duo_2_wifi',
  });
  console.log(ffprobe[0]);
}

void main();
