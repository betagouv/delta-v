import IORedis, { Redis } from 'ioredis';

import { buildConfig, IDatabaseConfig } from './databaseConfig';

let redisConnection: Redis;
let config: IDatabaseConfig;

export const getRedisConnection = (): Redis => {
  config = config || buildConfig();
  if (!config.DB_CACHE_REDIS_URL) {
    throw new Error('Missing DB_CACHE_REDIS_URL - adn-db getRedisConnection');
  }
  if (!redisConnection) {
    redisConnection = new IORedis(config.DB_CACHE_REDIS_URL);
  }
  return redisConnection;
};

export const closeRedisConnection = (): void => {
  redisConnection.disconnect();
};
