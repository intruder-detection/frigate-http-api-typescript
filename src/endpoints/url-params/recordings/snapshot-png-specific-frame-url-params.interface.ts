import { CameraNameUrlParams } from '../camera-name-url-params.interface';

export interface SnapshotPNGSpecificFrameUrlParameters extends CameraNameUrlParams {
  frame_time: number;
}
