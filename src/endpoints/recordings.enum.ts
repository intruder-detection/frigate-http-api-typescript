export enum Recordings {
  VodSpecificHour = 'vod/<year>-<month>/<day>/<hour>/<camera_name>',
  VodSpecificHourWithTimezone = 'vod/<year>-<month>/<day>/<hour>/<camera_name>/<timezone>',
  VodForEvent = 'vod/event/<event_id>',
  M3u8VodForEvent = 'vod/event/<event_id>/index.m3u8',
  VodForRange = 'vod/<camera_name>/start/<start_timestamp>/end/<end_timestamp>',
  M3u8VodForRange = 'vod/<camera_name>/start/<start_timestamp>/end/<end_timestamp>/index.m3u8',
  HourlySummaryRecordings = '<camera_name>/recordings/summary',
  RecordingSegmentsForRange = '<camera_name>/recordings',
  SnapshotPNGSpecificFrame = '<camera_name>/recordings/<frame_time>/snapshot.png',
}
