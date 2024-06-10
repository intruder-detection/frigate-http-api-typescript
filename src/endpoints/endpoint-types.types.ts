import { ManagementAndInformation } from './app.enum';
import { FFProbeQueryParameters } from './query-params/app/ffprobe.interface';
import { StatsResponse } from './responses/app/stats.interface';
import { ConfigResponse } from './responses/app/config.interface';
import { FFprobeResponse } from './responses/app/ffprobe.interface';
import { RestartResponse } from './responses/app/restart.interface';
import { Media } from './media';
import { MJPEGDebugStream } from './query-params/media/mjpeg-stream.interface';
import * as Stream from 'node:stream';
import { LatestJPG } from './query-params/media/latest-jpg.interface';

interface CameraName {
  camera_name: string;
}

interface CameraAndLabelName {
  camera_name: string;
  label: string;
}

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
  [ManagementAndInformation.Restart]: {
    urlParams: undefined;
    queryParams: undefined;
    response: RestartResponse;
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
      [key: string]: FFprobeResponse;
    };
  };
  [ManagementAndInformation.CameraPTZInfo]: {
    urlParams: CameraName;
    queryParams: undefined;
    response: any; // TODO: Use Camera with PTZ info to see possible response type
  };
  // Camera Media
  [Media.MJPEGDebugStream]: {
    urlParams: CameraName;
    queryParams: MJPEGDebugStream;
    response: Stream;
  };
  [Media.LatestJPG]: {
    urlParams: CameraName;
    queryParams: LatestJPG;
    response: string;
  };
  [Media.ThumbnailJPG]: {
    urlParams: CameraAndLabelName;
    queryParams: undefined;
    response: string;
  };
}
