export enum Recordings {
  VodSpecificHour = 'vod/<year>-<month>/<day>/<hour>/<camera_name>',
  VodSpecificHourWithTimezone = 'vod/<year>-<month>/<day>/<hour>/<camera_name>/<timezone>',
  VodForEvent = 'vod/event/<event_id>',
  VodForRange = 'vod/<camera_name>/start/<start_timestamp>/end/<end_timestamp>',
  HourlySummaryRecordings = '<camera_name>/recordings/summary',
  RecordingSegmentsForRange = '<camera_name>/recordings',
  SnapshotPNGSpecificFrame = '<camera_name>/recordings/<frame_time>/snapshot.png',
}
