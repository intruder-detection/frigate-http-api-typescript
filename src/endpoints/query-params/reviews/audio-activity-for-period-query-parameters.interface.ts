export interface AudioActivityForPeriodQueryParameters {
  after?: number; // Unix timestamp for the beginning of range
  before?: number; // Unix timestamp for the end of range
  cameras?: string; // Comma-separated list of cameras
  scale?: number; // Scale in seconds. Default 30.
}
