export enum Exports {
  ListExports = 'exports',
  ExportTimeRangeMP4ToDisk = 'export/<camera_name>/start/<start_timestamp>/end/<end_timestamp>',
  DeleteExportById = 'export/<export_id>',
  RenameExport = 'export/<export_id>/<export_name_new>',
}
