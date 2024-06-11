export enum Recordings {
  LiveStreamURLHour = 'vod/<year>-<month>/<day>/<hour>/<camera_name>/master.m3u8',
  LiveStreamURLEvent = 'vod/event/<event-id>/index.m3u8',
  LiveStreamURLTimeRange = 'vod/<camera_name>/start/<start_timestamp>/end/<end_timestamp>/index.m3u8',
  HourlySummaryRecordings = '<camera_name>/recordings/summary',
  SegmentDetailsForRange = '<camera_name>/recordings',
  SnapshotPNGSpecificFrame = '<camera_name>/recordings/<frame_time>/snapshot.png',
}
