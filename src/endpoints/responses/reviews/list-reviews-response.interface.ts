export interface ListReviewResponse {
  camera: string;
  data: Data;
  end_time: number;
  has_been_reviewed: boolean;
  id: string;
  severity: string;
  start_time: number;
  thumb_path: string;
}

interface Data {
  audio: any[];
  detections: string[];
  objects: string[];
  sub_labels: any[];
  zones: any[];
}
