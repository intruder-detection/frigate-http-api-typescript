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
import { GridJPG } from './query-params/media/grid-jpg.interface';
import { Events } from './events.enum';
import { EventsQueryParams } from './query-params/events/events.interface';
import { EventsResponse } from './responses/events/events.interface';
import { EventsSummaryResponse } from './responses/events/events-summary.interface';
import { EventsByIDResponse } from './responses/events/events-by-id.interface';
import { IdPlus } from './query-params/events/id-plus.interface';
import { SubLabelBody } from './body/events/sub-label.interface';
import { ThumbnailJPG } from './query-params/events/thumbnail-jpg.interface';
import { SnapshotCleanPng } from './query-params/events/snapshot-clean-png.interface';
import { SnapshotJPG } from './query-params/events/snapshot-jpg.interface';
import { CreateLabel } from './body/events/create-label.interface';
import { CreateLabelResponse } from './responses/events/create-label.interface';
import { Preview } from './preview.enum';
import { MetaDataForPreviewsInRangeUrlParams } from './url-params/previews/metadata-for-previews-in-range.interface';
import { CameraAndLabelNameUrlParams } from './url-params/camera-and-label-name-url-params.interface';
import { CameraNameUrlParams } from './url-params/camera-name-url-params.interface';
import { EventIdUrlParams } from './url-params/event-id-url-params.interface';
import { MetaDataForPreviewsInHourUrlParams } from './url-params/previews/metadata-for-previews-in-hour.interface';
import { GifFromPreviewUrlParams } from './url-params/previews/gif-from-preview-url-params.interface';
import { Recordings } from './recordings.enum';
import { LivestreamUrlHourUrlParamsInterface } from './url-params/recordings/livestream-url-hour-url-params.interface';
import { LivestreamInRangeUrlParams } from './url-params/recordings/livestream-in-range-url-params.interface';
import { ExportTimeRangeMp4Body } from './body/exports/time-range-mp4.interface';
import { ExportResponse } from './responses/exports/export-response.interface';
import { BasicResponse } from './responses/basic-response.interface';
import { RenameExportUrlParams } from './url-params/exports/rename-export-url-params.interface';
import { DeleteExportUrlParams } from './url-params/exports/delete-export-url-params.interface';
import {
  ExportTimeRangeMp4ToDiskUrlParams,
} from './url-params/exports/export-time-range-mp4-to-disk-url-params.interface';
import { Exports } from './exports.enum';
import { RecordingsPerHourResponse } from './responses/recordings/hourly-summary-recordings-response.interface';
import { SegmentDetailsForRange } from './query-params/recordings/segment-details-for-range-body.interface';
import { RecordingsForRange } from './responses/recordings/recordings-for-range-response.interface';
import {
  SnapshotPNGSpecificFrameUrlParameters,
} from './url-params/recordings/snapshot-png-specific-frame-url-params.interface';
import { Timeline } from './timeline.enum';
import { TimelineQueryParameters } from './query-params/timeline/timeline-query-parameters.interface';
import { TimelineResponse } from './responses/timeline/timeline-response.interface';
import { Reviews } from './reviews.enum';
import { ListReviewsQueryParams } from './query-params/reviews/list-reviews-query-params.interface';
import { ReviewResponse } from './responses/reviews/list-reviews-response.interface';
import { ReviewIdUrlParams } from './url-params/reviews/review-id-url-params.interface';
import { ReviewSummaryQueryParameters } from './query-params/reviews/review-summary-query-parameters.interface';
import { SummaryLast30DaysResponse } from './responses/reviews/summary-last-30-days-response.interface';
import { MarkViewedManyBody } from './body/reviews/mark-reviewed-many-body.interface';
import { DeleteReviewManyBody } from './body/reviews/delete-review-many-body.interface';
import { MotionActivityForPeriodQueryParameters } from './query-params/reviews/motion-activity-for-period.interface';
import { MotionActivityForPeriod } from './responses/reviews/motion-activity-for-period-response.interface';
import { AudioActivityForPeriod } from './responses/reviews/audio-activity-for-period-response.interface';
import {
  MetadataForPreviewsInRangeResponse,
} from './responses/preview/metadata-for-previews-in-range-response.interface';

/**
 * API Functions Mapping.
 */
// GET
export interface FrigateApiGetEndpointsMapping {
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
      [key: string]: FFprobeResponse;
    };
  };
  [ManagementAndInformation.CameraPTZInfo]: {
    urlParams: CameraNameUrlParams;
    queryParams: undefined;
    response: any; // TODO: Use Camera with PTZ info to see possible response type
  };
  // Camera Media
  [Media.MJPEGDebugStream]: {
    urlParams: CameraNameUrlParams;
    queryParams: MJPEGDebugStream;
    response: Stream;
  };
  [Media.LatestJPG]: {
    urlParams: CameraNameUrlParams;
    queryParams: LatestJPG;
    response: string;
  };
  [Media.ThumbnailJPG]: {
    urlParams: CameraAndLabelNameUrlParams;
    queryParams: undefined;
    response: string;
  };
  [Media.ClipMP4]: {
    urlParams: CameraAndLabelNameUrlParams;
    queryParams: undefined;
    response: string;
  };
  [Media.SnapshotJPG]: {
    urlParams: CameraAndLabelNameUrlParams;
    queryParams: undefined;
    response: string;
  };
  [Media.GridJPG]: {
    urlParams: CameraNameUrlParams;
    queryParams: GridJPG;
    response: string;
  };
  // Events
  [Events.Events]: {
    urlParams: undefined;
    queryParams: EventsQueryParams;
    response: EventsResponse[];
  };
  [Events.EventsSummary]: {
    urlParams: undefined;
    queryParams: undefined;
    response: EventsSummaryResponse;
  };
  [Events.ById]: {
    urlParams: EventIdUrlParams;
    queryParams: undefined;
    response: EventsByIDResponse;
  };
  [Events.ThumbnailJPG]: {
    urlParams: EventIdUrlParams;
    queryParams: ThumbnailJPG;
    response: Uint8Array;
  };
  [Events.ClipMp4]: {
    urlParams: EventIdUrlParams;
    queryParams: undefined;
    response: Uint8Array;
  };
  [Events.SnapshotCleanPNG]: {
    urlParams: EventIdUrlParams;
    queryParams: SnapshotCleanPng;
    response: string;
  };
  [Events.SnapshotJPG]: {
    urlParams: EventIdUrlParams;
    queryParams: SnapshotJPG;
    response: string;
  };
  // Previews
  [Preview.Gif]: {
    urlParams: EventIdUrlParams;
    queryParams: undefined;
    response: Uint8Array;
  };
  [Preview.MetadataForPreviewsInRange]: {
    urlParams: MetaDataForPreviewsInRangeUrlParams;
    queryParams: undefined;
    response: MetadataForPreviewsInRangeResponse[];
  };
  [Preview.MetadataForPreviewsInHour]: {
    urlParams: MetaDataForPreviewsInHourUrlParams;
    queryParams: undefined;
    response: MetadataForPreviewsInRangeResponse[];
  };
  [Preview.GifFromPreview]: {
    urlParams: GifFromPreviewUrlParams;
    queryParams: undefined;
    response: any; // TODO: Verify
  };
  // Exports
  [Exports.ListExports]: {
    urlParams: undefined;
    queryParams: undefined;
    response: ExportResponse[];
  };
  // Recordings
  [Recordings.LiveStreamURLHour]: {
    urlParams: LivestreamUrlHourUrlParamsInterface;
    queryParams: undefined;
    response: any; // TODO: Verify
  };
  [Recordings.LiveStreamURLEvent]: {
    urlParams: EventIdUrlParams;
    queryParams: undefined;
    response: any; // TODO: Verify
  };
  [Recordings.LiveStreamURLTimeRange]: {
    urlParams: LivestreamInRangeUrlParams;
    queryParams: undefined;
    response: any; // TODO: Verify
  };
  [Recordings.HourlySummaryRecordings]: {
    urlParams: CameraNameUrlParams;
    queryParams: undefined;
    response: RecordingsPerHourResponse[];
  };
  [Recordings.RecordingSegmentsForRange]: {
    urlParams: CameraNameUrlParams;
    queryParams: SegmentDetailsForRange;
    response: RecordingsForRange[];
  };
  [Recordings.SnapshotPNGSpecificFrame]: {
    urlParams: SnapshotPNGSpecificFrameUrlParameters;
    queryParams: undefined;
    response: Uint8Array;
  };
  // Timeline
  [Timeline.Timeline]: {
    urlParams: undefined;
    queryParams: TimelineQueryParameters;
    response: TimelineResponse[];
  };
  // Reviews
  [Reviews.ListReviews]: {
    urlParams: undefined;
    queryParams: ListReviewsQueryParams;
    response: ReviewResponse[];
  };
  [Reviews.GetReviewById]: {
    urlParams: ReviewIdUrlParams;
    queryParams: undefined;
    response: ReviewResponse;
  };
  [Reviews.SummaryLast30Days]: {
    urlParams: undefined;
    queryParams: ReviewSummaryQueryParameters;
    response: SummaryLast30DaysResponse;
  };
  [Reviews.MotionActivityForPeriod]: {
    urlParams: undefined;
    queryParams: MotionActivityForPeriodQueryParameters;
    response: MotionActivityForPeriod[];
  };
  [Reviews.AudioActivityForPeriod]: {
    urlParams: undefined;
    queryParams: MotionActivityForPeriodQueryParameters;
    response: AudioActivityForPeriod[];
  };
}

// POST
export interface FrigateApiPostEndpointsMapping {
  // Management && Information
  [ManagementAndInformation.Restart]: {
    urlParams: undefined;
    queryParams: undefined;
    body: undefined;
    response: RestartResponse;
  };
  // Events
  [Events.IdRetain]: {
    urlParams: EventIdUrlParams;
    queryParams: undefined;
    body: undefined;
    response: BasicResponse;
  };
  [Events.SubmitForFrigatePlus]: {
    urlParams: EventIdUrlParams;
    queryParams: IdPlus;
    body: undefined;
    response: BasicResponse;
  };
  [Events.SubmitForFrigatePlusFalsePositive]: {
    urlParams: EventIdUrlParams;
    queryParams: undefined;
    body: undefined;
    response: BasicResponse;
  };
  [Events.SubLabel]: {
    urlParams: EventIdUrlParams;
    queryParams: undefined;
    body: SubLabelBody;
    response: BasicResponse;
  };
  [Events.CreateLabel]: {
    urlParams: CameraAndLabelNameUrlParams;
    queryParams: undefined;
    body: CreateLabel;
    response: CreateLabelResponse;
  };
  // Recordings
  [Exports.ExportTimeRangeMP4ToDisk]: {
    urlParams: ExportTimeRangeMp4ToDiskUrlParams;
    queryParams: undefined;
    body?: ExportTimeRangeMp4Body;
    response: BasicResponse;
  };
  // Reviews
  [Reviews.MarkViewedMany]: {
    urlParams: undefined;
    queryParams: undefined;
    body?: MarkViewedManyBody;
    response: BasicResponse;
  };
  [Reviews.DeleteReviewedMany]: {
    urlParams: undefined;
    queryParams: undefined;
    body: DeleteReviewManyBody;
    response: BasicResponse;
  };
}

// PUT
export interface FrigateApiPutEndpointsMapping {
  [Events.EndEvent]: {
    urlParams: EventIdUrlParams;
    queryParams: undefined;
    body: undefined;
    response: BasicResponse;
  };
}

// DELETE
export interface FrigateApiDeleteEndpointsMapping {
  // Events
  [Events.ById]: {
    urlParams: EventIdUrlParams;
    queryParams: undefined;
    response: BasicResponse;
  };
  [Events.IdRetain]: {
    urlParams: EventIdUrlParams;
    queryParams: undefined;
    response: BasicResponse;
  };
  [Exports.DeleteExportById]: {
    urlParams: DeleteExportUrlParams;
    queryParams: undefined;
    response: BasicResponse;
  };
  // Reviews
  [Reviews.MarkReviewedById]: {
    urlParams: ReviewIdUrlParams;
    queryParams: undefined;
    response: BasicResponse;
  };
}

// PATCH
export interface FrigateApiPatchEndpointsMapping {
  // Recordings
  [Exports.RenameExport]: {
    urlParams: RenameExportUrlParams;
    queryParams: undefined;
    body?: undefined;
    response: BasicResponse;
  };
}
