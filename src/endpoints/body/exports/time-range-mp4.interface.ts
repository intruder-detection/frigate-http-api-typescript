export interface ExportTimeRangeMp4Body {
  playback?: 'realtime' | 'timelapse_25x';
  // https://github.com/blakeblackshear/frigate/blob/v0.14.0-beta2/frigate/api/export.py#L49C37-L49C41
  name?: string; // Export name. Up to 256 chars.
}
