import { ManagementAndInformation } from './app.enum';
import { FFProbeQueryParameters } from './query-params/app/ffprobe.interface';
import { StatsResponse } from './responses/app/stats.interface';
import { ConfigResponse } from './responses/app/config.interface';
import { FFprobe } from './responses/app/ffprobe.interface';

/**
 * API Functions Mapping.
 */
export interface FrigateApiEndpointsMapping {
  // Management && Information
  [ManagementAndInformation.Config]: {
    urlParams: undefined;
    queryParams: undefined;
    response: ConfigResponse;
  };
  [ManagementAndInformation.Stats]: {
    urlParams: undefined;
    queryParams: undefined;
    response: StatsResponse;
  };
  [ManagementAndInformation.Version]: {
    urlParams: undefined;
    queryParams: undefined;
    response: string;
  };
  [ManagementAndInformation.FFProbe]: {
    urlParams: undefined;
    queryParams: FFProbeQueryParameters;
    response: {
      [key: string]: FFprobe;
    };
  };
  [ManagementAndInformation.CameraPTZInfo]: {
    urlParams: {
      camera_name: string;
    };
    queryParams: undefined;
    response: any; // TODO: Use Camera with PTZ info to see possible response type
  };
}

