import { CameraNameUrlParams } from '../camera-name-url-params.interface';

export interface LivestreamUrlHourUrlParamsInterface extends CameraNameUrlParams {
  year: number;
  month: number;
  day: number;
  hour: number;
  timezone: string;
}
