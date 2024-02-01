import { getRedisConnection } from '../../loader/redis';
import { ILogger } from '../../core/logger';
import { CacheKey } from './buildCacheKey';
import { CacheObject } from './getFromCache';

const logSavedCache = (cacheKey: CacheKey, expiryTime: number, logger?: ILogger): void => {
  if (logger) {
    logger.info({
      message: '- Custom cache created',
      context: { cacheKey, cacheDuration: expiryTime },
    });
  }
};

export async function saveCache(
  cacheKey: CacheKey,
  // eslint-disable-next-line @typescript-eslint/ban-types
  value: object,
  expiryTime: number,
  logger?: ILogger,
): Promise<number | undefined> {
  const redisConnection = getRedisConnection();

  if (redisConnection) {
    const expirationDate = new Date().getTime() + expiryTime;
    const cacheObject: CacheObject<typeof value> = {
      value,
      expirationDate,
    };
    const redisResponse = await redisConnection.hset(
      cacheKey.mainKey,
      cacheKey.detailsKey,
      JSON.stringify(cacheObject),
    );
    await redisConnection.pexpire(cacheKey.mainKey, expiryTime);

    logSavedCache(cacheKey, expiryTime, logger);

    return redisResponse;
  }
}
