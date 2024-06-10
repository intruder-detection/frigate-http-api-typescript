export interface LatestJPG {
  h?: number; // Height in pixels (optional)
  bbox?: 0 | 1; // Show bounding boxes (0 or 1) (optional)
  timestamp?: 0 | 1; // Print timestamp (0 or 1) (optional)
  zones?: 0 | 1; // Draw zones (0 or 1) (optional)
  mask?: 0 | 1; // Overlay mask (0 or 1) (optional)
  motion?: 0 | 1; // Draw motion detection boxes (0 or 1) (optional)
  regions?: 0 | 1; // Draw object detection regions (0 or 1) (optional)
  quality?: number; // Jpeg encoding quality (0-100, defaults to 70) (optional)
}
