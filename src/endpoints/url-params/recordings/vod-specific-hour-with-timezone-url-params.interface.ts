import { VodSpecificHourUrlParams } from './vod-specific-hour-url-params.interface';

export interface VodSpecificHourWithTimezoneUrlParams extends VodSpecificHourUrlParams {
  timezone: string;
}
