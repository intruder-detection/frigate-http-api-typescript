export interface SnapshotJPG {
  h?: number; // Height in pixels (optional)
  bbox?: 0 | 1; // Show bounding boxes (0 or 1) (optional)
  timestamp?: 0 | 1; // Print timestamp (0 or 1) (optional)
  crop?: 0 | 1; // Crop the snapshot to the (0 or 1) (optional)
  quality?: number; // Jpeg encoding quality (0-100, defaults to 70) (optional)
  download?: boolean; // Download the image
}
