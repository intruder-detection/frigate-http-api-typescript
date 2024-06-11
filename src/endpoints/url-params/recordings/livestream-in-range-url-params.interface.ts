import { CameraNameUrlParams } from '../camera-name-url-params.interface';
import { StartEndTimestampUrlParams } from '../start-end-timestamp-url-params.interface';

export interface LivestreamInRangeUrlParams extends CameraNameUrlParams, StartEndTimestampUrlParams {}
