import { RateLimiterOptions } from 'nestjs-rate-limiter';

export const RateLimiterConfig: RateLimiterOptions = {
  for: 'Express',
  type: 'Memory',
  keyPrefix: 'global',
  points: 50,
  pointsConsumed: 1,
  inmemoryBlockOnConsumed: 0,
  duration: 10,
  blockDuration: 10,
  inmemoryBlockDuration: 0,
  queueEnabled: false,
  whiteList: [],
  blackList: [],
  maxQueueSize: 100,
  omitResponseHeaders: false,
  errorMessage: '요청 횟수를 초과했습니다.',
  logger: false,
};
