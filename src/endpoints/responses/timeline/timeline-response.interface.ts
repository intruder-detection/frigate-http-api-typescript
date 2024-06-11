export interface TimelineResponse {
  camera: string;
  class_type: string;
  data: Data;
  source: string;
  source_id: string;
  timestamp: number;
}

interface Data {
  attribute: string;
  box: number[];
  label: string;
  region: number[];
  sub_label: null;
}
