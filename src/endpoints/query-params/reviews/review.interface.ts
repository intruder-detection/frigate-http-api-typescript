export interface Review {
  before?: number; // Epoch time (optional)
  after?: number;  // Epoch time (optional)
  cameras?: 'all' | string; // Comma-separated list of cameras (optional)
  labels?: string;  // Comma-separated list of labels (optional)
  reviewed?: number; // Include reviewed items (0 or 1, optional)
  limit?: number;    // Limit the number of events returned (optional)
  severity?: 'alert' | 'detection' | 'significant_motion'; // Limit items by severity (optional)
}
