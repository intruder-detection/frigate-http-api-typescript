import { CameraNameUrlParams } from '../camera-name-url-params.interface';

export interface MetaDataForPreviewsInRangeUrlParams extends CameraNameUrlParams {
  start_timestamp: number;
  end_timestamp: number;
}
