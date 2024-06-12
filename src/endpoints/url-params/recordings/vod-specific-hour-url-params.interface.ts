import { CameraNameUrlParams } from '../camera-name-url-params.interface';

export interface VodSpecificHourUrlParams extends CameraNameUrlParams {
  year: number;
  month: number;
  day: number;
  hour: number;
  // There's a specific endpoint that accepts the timezone
  timezone?: string;
}
