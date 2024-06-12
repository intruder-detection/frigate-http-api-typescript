export enum Reviews {
  ListReviews = 'review',
  SummaryLast30Days = 'review/summary',
  MarkReviewedMany = 'reviews/viewed',
  MarkReviewedById = 'review/<id>/viewed',
  DeleteReviewed = 'reviews/delete',
  MotionActivityForPeriod = 'review/activity/motion',
  AudioActivityForPeriod = 'review/activity/audio',
}
