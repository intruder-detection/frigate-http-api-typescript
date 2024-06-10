import { FrigateHTTPAPI } from '../src/frigate-http-api';
import { ManagementAndInformation } from '../src/endpoints/app.enum';
import { ConfigResponse } from '../src/endpoints/responses/app/config.interface';

async function main() {
  console.log('Hello World!');
  const res = await FrigateHTTPAPI.get<ConfigResponse>(ManagementAndInformation.Config);
  console.log(res.mqtt.client_id);
}

void main();
