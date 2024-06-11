import { CameraNameUrlParams } from '../camera-name-url-params.interface';
import { StartEndTimestampUrlParams } from '../start-end-timestamp-url-params.interface';

export interface ExportTimeRangeMp4ToDiskUrlParams extends CameraNameUrlParams, StartEndTimestampUrlParams {}
