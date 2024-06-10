import { CameraNameUrlParams } from '../camera-name-url-params.interface';

export interface GifFromPreviewUrlParams extends CameraNameUrlParams {
  start_timestamp: number;
  end_timestamp: number;
}
