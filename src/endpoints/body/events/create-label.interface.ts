export interface CreateLabel {
  sub_label: string;
  duration: number;
  include_recording: boolean;
  draw: Draw;
}

interface Draw {
  boxes: Box[];
}

interface Box {
  box: number[];
  color: number[];
  score: number;
}
