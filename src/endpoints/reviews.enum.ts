export enum Reviews {
  ListReviews = 'review',
  GetReviewById = 'review/<review_id>',
  SummaryLast30Days = 'review/summary',
  MarkViewedMany = 'reviews/viewed',
  MarkReviewedById = 'review/<review_id>/viewed',
  DeleteReviewedMany = 'reviews/delete',
  MotionActivityForPeriod = 'review/activity/motion',
  AudioActivityForPeriod = 'review/activity/audio',
}
