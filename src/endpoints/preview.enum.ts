export enum Preview {
  Gif = 'events/<id>/preview.gif',
  MetadataForPreviewsInRange = 'preview/<camera>/start/<start-timestamp>/end/<end-timestamp>',
  MetadataForPreviewsInHour = 'preview/<year>-<month>/<day>/<hour>/<camera>/<timezone>',
  Frame  = 'preview/<file_name>/thumbnail.jpg',
  GifFromPreview = '/<camera>/start/<start-timestamp>/end/<end-timestamp>/preview.gif',
}
