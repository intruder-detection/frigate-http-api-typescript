import { CameraNameUrlParams } from '../camera-name-url-params.interface';

export interface MetaDataForPreviewsInHourUrlParams extends CameraNameUrlParams {
  year: number;
  month: number;
  day: number;
  hour: number;
  timezone: string;
}
