export interface EventsResponse {
  box: null;
  camera: string;
  data: Data;
  end_time: number;
  false_positive: null;
  has_clip: boolean;
  has_snapshot: boolean;
  id: string;
  label: string;
  plus_id: null;
  retain_indefinitely: boolean;
  start_time: number;
  sub_label: null;
  thumbnail: string;
  top_score: null;
  zones: any[];
}

export interface Data {
  attributes: any[];
  box: number[];
  region: number[];
  score: number;
  top_score: number;
  type: string;
}
