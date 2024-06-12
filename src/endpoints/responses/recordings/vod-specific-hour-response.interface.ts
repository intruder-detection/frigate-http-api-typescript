export interface VodSpecificHourResponse {
  cache: boolean;
  consistentSequenceMediaInfo: boolean;
  discontinuity: boolean;
  durations: number[];
  segment_duration: number;
  sequences: Sequence[];
}

interface Sequence {
  clips: Clip[];
}

interface Clip {
  keyFrameDurations: number[];
  path: string;
  type: Type;
}

enum Type {
  Source = 'source',
}
