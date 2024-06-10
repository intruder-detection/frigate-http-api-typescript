export enum Recordings {
  LiveStreamURLHour = 'vod/<year>-<month>/<day>/<hour>/<camera>/master.m3u8',
  LiveStreamURLEvent = 'vod/event/<event-id>/index.m3u8',
  LiveStreamURLTimeRange = 'vod/<camera>/start/<start-timestamp>/end/<end-timestamp>/index.m3u8',
  ExportTimeRangeMp4 = 'export/<camera>/start/<start-timestamp>/end/<end-timestamp>',
  DeleteExportByName = 'export/<export_name>',
  RenameExport = 'export/<export_name_current>/<export_name_new>',
  HourlySummaryExports = '<camera_name>/recordings/summary',
  SegmentDetailsForRange = '<camera_name>/recordings',
  SnapshotPngSpecificFrame = '<camera_name>/recordings/<frame_time>/snapshot.png',
}
