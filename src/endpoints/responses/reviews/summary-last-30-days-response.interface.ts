export interface SummaryLast30DaysResponse {
  [key: string]: ReviewSummary;
  last24Hours: Omit<ReviewSummary, 'day'>;
}

export interface ReviewSummary {
  day?: Date;
  reviewed_alert: number;
  reviewed_detection: number;
  reviewed_motion: number;
  total_alert: number;
  total_detection: number;
  total_motion: number;
}
