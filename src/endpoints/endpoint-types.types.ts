import { ManagementAndInformation } from './app.enum';
import { FFProbeQueryParameters } from './query-params/app/ffprobe.interface';
import { StatsResponse } from './responses/app/stats.interface';
import { ConfigResponse } from './responses/app/config.interface';
import { FFprobe } from './responses/app/ffprobe.interface';

/**
 * API Functions Mapping.
 */
export type FrigateApiEndpointsMapping = {
  [ManagementAndInformation.Config]: {
    queryParams: undefined;
    response: ConfigResponse;
  };
  [ManagementAndInformation.Stats]: {
    queryParams: undefined;
    response: StatsResponse;
  };
  [ManagementAndInformation.Version]: {
    queryParams: undefined;
    response: string;
  };
  [ManagementAndInformation.FFProbe]: {
    queryParams?: FFProbeQueryParameters;
    response: {
      [key: string]: FFprobe
    };
  };
}

