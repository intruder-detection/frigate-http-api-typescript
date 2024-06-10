export interface EventsByIDResponse {
  area: null;
  box: null;
  camera: string;
  data: Data;
  detector_type: string;
  end_time: number;
  false_positive: null;
  has_clip: boolean;
  has_snapshot: boolean;
  id: string;
  label: string;
  model_hash: string;
  model_type: string;
  plus_id: null;
  ratio: number;
  region: null;
  retain_indefinitely: boolean;
  score: null;
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
