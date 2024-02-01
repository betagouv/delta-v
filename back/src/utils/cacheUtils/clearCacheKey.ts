import { ILogger } from '../../core/logger';
import { getRedisConnection } from '../../loader/redis';

const logClearedCache = (mainKey: string, logger?: ILogger): void => {
  if (logger) {
    logger.info({
      message: '- Custom cache cleared',
      context: { mainKey },
    });
  }
};

export type ClearCacheKeyFunction = (mainKey: string, logger?: ILogger) => Promise<void>;

export const clearCacheKey: ClearCacheKeyFunction = async (mainKey, logger) => {
  const redisConnection = getRedisConnection();

  await redisConnection.unlink(mainKey);
  logClearedCache(mainKey, logger);
};
