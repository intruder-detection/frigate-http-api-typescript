export interface ConfigResponse {
  audio: Audio;
  birdseye: ConfigResponseBirdseye;
  cameras: { [key: string]: Camera };
  database: Database;
  detect: Detect;
  detectors: Detectors;
  environment_vars: EnvironmentVars;
  ffmpeg: Ffmpeg;
  go2rtc: Go2RTC;
  live: Live;
  logger: Logger;
  model: ConfigResponseModel;
  motion: null;
  mqtt: Mqtt;
  objects: ConfigResponseObjects;
  plus: Plus;
  record: Record;
  rtmp: Plus;
  snapshots: Snapshots;
  telemetry: Telemetry;
  timestamp_style: TimestampStyle;
  ui: ConfigResponseUI;
}

interface Audio {
  enabled: boolean;
  enabled_in_config: boolean | null;
  filters: AudioFilters;
  listen: string[];
  max_not_heard: number;
  min_volume: number;
  num_threads: number;
}

interface AudioFilters {
  speech: Speech;
}

interface Speech {
  threshold: number;
}

interface ConfigResponseBirdseye {
  enabled: boolean;
  height: number;
  inactivity_threshold: number;
  layout: Layout;
  mode: string;
  quality: number;
  restream: boolean;
  width: number;
}

interface Layout {
  max_cameras: null;
  scaling_factor: number;
}

interface Camera {
  audio: Audio;
  best_image_timeout: number;
  birdseye: ReolinkBirdseye;
  detect: Detect;
  enabled: boolean;
  ffmpeg: Ffmpeg;
  ffmpeg_cmds: FfmpegCmd[];
  live: Live;
  motion: Motion;
  mqtt: Snapshots;
  name: string;
  objects: ReolinkObjects;
  onvif: Onvif;
  record: Record;
  rtmp: Plus;
  snapshots: Snapshots;
  timestamp_style: TimestampStyle;
  ui: ReolinkUI;
  webui_url: null;
  zones: EnvironmentVars;
}

interface ReolinkBirdseye {
  enabled: boolean;
  mode: string;
  order: number;
}

interface Detect {
  annotation_offset: number;
  enabled: boolean;
  fps: number;
  height: number | null;
  max_disappeared: number | null;
  min_initialized: number | null;
  stationary: Stationary;
  width: number | null;
}

interface Stationary {
  interval: number | null;
  max_frames: MaxFrames;
  threshold: number | null;
}

interface MaxFrames {
  default: null;
  objects: EnvironmentVars;
}

interface EnvironmentVars {
}

interface Ffmpeg {
  global_args: string[];
  hwaccel_args: any[];
  input_args: string;
  inputs?: Input[];
  output_args: OutputArgs;
  retry_interval: number;
}

interface Input {
  global_args: any[];
  hwaccel_args: any[];
  input_args: any[];
  path: string;
  roles: string[];
}

interface OutputArgs {
  detect: string[];
  record: string;
  rtmp: string;
}

interface FfmpegCmd {
  cmd: string;
  roles: string[];
}

interface Live {
  height: number;
  quality: number;
  stream_name: string;
}

interface Motion {
  contour_area: number;
  delta_alpha: number;
  frame_alpha: number;
  frame_height: number;
  improve_contrast: boolean;
  lightning_threshold: number;
  mask: string;
  mqtt_off_delay: number;
  threshold: number;
}

interface Snapshots {
  bounding_box: boolean;
  crop: boolean;
  enabled: boolean;
  height: number | null;
  quality: number;
  required_zones: any[];
  timestamp: boolean;
  clean_copy?: boolean;
  retain?: SnapshotsRetain;
}

interface SnapshotsRetain {
  default: number;
  mode: string;
  objects: EnvironmentVars;
}

interface ReolinkObjects {
  filters: PurpleFilters;
  mask: string;
  track: string[];
}

interface PurpleFilters {
  car: Amazon;
  person: Amazon;
}

interface Amazon {
  mask: null;
  max_area: number;
  max_ratio: number;
  min_area: number;
  min_ratio: number;
  min_score: number;
  threshold: number;
}

interface Onvif {
  autotracking: Autotracking;
  host: string;
  password: null;
  port: number;
  user: null;
}

interface Autotracking {
  calibrate_on_startup: boolean;
  enabled: boolean;
  enabled_in_config: boolean;
  movement_weights: any[];
  required_zones: any[];
  return_preset: string;
  timeout: number;
  track: string[];
  zoom_factor: number;
  zooming: string;
}

interface Record {
  enabled: boolean;
  enabled_in_config: boolean | null;
  events: Events;
  expire_interval: number;
  export: Export;
  retain: RecordRetain;
  sync_recordings: boolean;
}

interface Events {
  objects: null;
  post_capture: number;
  pre_capture: number;
  required_zones: any[];
  retain: SnapshotsRetain;
}

interface Export {
  timelapse_args: string;
}

interface RecordRetain {
  days: number;
  mode: string;
}

interface Plus {
  enabled: boolean;
}

interface TimestampStyle {
  color: Color;
  effect: null;
  format: string;
  position: string;
  thickness: number;
}

interface Color {
  blue: number;
  green: number;
  red: number;
}

interface ReolinkUI {
  dashboard: boolean;
  order: number;
}

interface Database {
  path: string;
}

interface Detectors {
  coral: Coral;
}

interface Coral {
  device: string;
  model: CoralModel;
  type: string;
}

interface CoralModel {
  height: number;
  input_pixel_format: string;
  input_tensor: string;
  labelmap: { [key: string]: string };
  labelmap_path: null;
  model_type: string;
  path: string;
  width: number;
}

interface Go2RTC {
  streams: Streams;
}

interface Streams {
  back: string[];
}

interface Logger {
  default: string;
  logs: EnvironmentVars;
}

interface ConfigResponseModel {
  height: number;
  input_pixel_format: string;
  input_tensor: string;
  labelmap: EnvironmentVars;
  labelmap_path: null;
  model_type: string;
  path: null;
  width: number;
}

interface Mqtt {
  client_id: string;
  enabled: boolean;
  host: string;
  port: number;
  stats_interval: number;
  tls_ca_certs: null;
  tls_client_cert: null;
  tls_client_key: null;
  tls_insecure: null;
  topic_prefix: string;
  user: null;
}

interface ConfigResponseObjects {
  filters: FluffyFilters;
  mask: string;
  track: string[];
}

interface FluffyFilters {
  amazon: Amazon;
  face: Amazon;
  fedex: Amazon;
  license_plate: Amazon;
  ups: Amazon;
}

interface Telemetry {
  network_interfaces: any[];
  stats: Stats;
  version_check: boolean;
}

interface Stats {
  amd_gpu_stats: boolean;
  intel_gpu_stats: boolean;
  network_bandwidth: boolean;
}

interface ConfigResponseUI {
  date_style: string;
  live_mode: string;
  strftime_fmt: null;
  time_format: string;
  time_style: string;
  timezone: null;
  use_experimental: boolean;
}
