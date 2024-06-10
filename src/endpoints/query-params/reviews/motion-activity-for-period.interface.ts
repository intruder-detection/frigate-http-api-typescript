export interface MotionActivityForPeriod {
  after: number; // Unix timestamp for beginning of range
  before: number; // Unix timestamp for end of range
  cameras: string; // Comma-separated list of cameras
}
