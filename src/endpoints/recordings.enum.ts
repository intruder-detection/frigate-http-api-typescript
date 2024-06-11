export enum Recordings {
  LiveStreamURLHour = 'vod/<year>-<month>/<day>/<hour>/<camera_name>/master.m3u8',
  LiveStreamURLEvent = 'vod/event/<event-id>/index.m3u8',
  LiveStreamURLTimeRange = 'vod/<camera_name>/start/<start_timestamp>/end/<end_timestamp>/index.m3u8',
  ExportTimeRangeMP4ToDisk = 'export/<camera_name>/start/<start_timestamp>/end/<end_timestamp>',
  DeleteExportToDiskByName = 'export/<export_name>',
  RenameExport = 'export/<export_name_current>/<export_name_new>',
  HourlySummaryExports = '<camera_name>/recordings/summary',
  SegmentDetailsForRange = '<camera_name>/recordings',
  SnapshotPNGSpecificFrame = '<camera_name>/recordings/<frame_time>/snapshot.png',
}
