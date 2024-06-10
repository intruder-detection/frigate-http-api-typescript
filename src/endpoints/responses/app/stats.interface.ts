export interface StatsResponse {
  cameras: { [key: string]: Camera };
  cpu_usages: { [key: string]: CPUUsage };
  detection_fps: number;
  detectors: Detectors;
  processes: Processes;
  service: Service;
}

interface Camera {
  audio_dBFS: number;
  audio_rms: number;
  camera_fps: number;
  capture_pid: number;
  detection_enabled: number;
  detection_fps: number;
  ffmpeg_pid: number;
  pid: number;
  process_fps: number;
  skipped_fps: number;
}

interface CPUUsage {
  cmdline: string;
  cpu: string;
  cpu_average: string;
  mem: string;
}

interface Detectors {
  coral: Coral;
}

interface Coral {
  detection_start: number;
  inference_speed: number;
  pid: number;
}

interface Processes {
  go2rtc: PidResponse;
  logger: PidResponse;
  recording: PidResponse;
}

interface PidResponse {
  pid: number;
}

interface Service {
  last_updated: number;
  latest_version: string;
  storage: { [key: string]: Storage };
  temperatures: Temperatures;
  uptime: number;
  version: string;
}

interface Storage {
  free: number;
  mount_type: string;
  total: number;
  used: number;
}

interface Temperatures {
}
