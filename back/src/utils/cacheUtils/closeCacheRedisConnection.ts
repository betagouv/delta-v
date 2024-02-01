import { getRedisConnection } from '../../loader/redis';

export const closeCacheRedisConnection = (): void => {
  const redisConnection = getRedisConnection();
  redisConnection && redisConnection.disconnect();
};
