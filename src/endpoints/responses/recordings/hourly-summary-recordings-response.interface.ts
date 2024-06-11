export interface RecordingsPerHourResponse {
  day: Date;
  events: number;
  hours: Hour[];
}

export interface Hour {
  duration: number;
  events: number;
  hour: string;
  motion: number;
  objects: number;
}
