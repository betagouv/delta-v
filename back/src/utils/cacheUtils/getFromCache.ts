import { ILogger } from '../../core/logger';
import { getRedisConnection } from '../../loader/redis';
import { CacheKey } from './buildCacheKey';

const logGetFromCache = (cacheKey: CacheKey, logger?: ILogger): void => {
  if (logger) {
    logger.info({
      message: '- Custom cache read',
      context: { key: cacheKey },
    });
  }
};

export type CacheObject<T> = {
  value: T;
  expirationDate: number; // milliseconds
};

export async function getFromCache<T>(cacheKey: CacheKey, logger?: ILogger): Promise<T | null> {
  const redisConnection = getRedisConnection();

  const rawResult = await redisConnection.hget(cacheKey.mainKey, cacheKey.detailsKey);
  if (!rawResult) {
    return null;
  }
  const result = JSON.parse(rawResult) as CacheObject<T>;

  if (result.expirationDate < new Date().getTime()) {
    return null;
  }

  logGetFromCache(cacheKey, logger);

  return result?.value;
}
