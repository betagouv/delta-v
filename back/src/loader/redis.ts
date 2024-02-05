import IORedis, { Redis } from 'ioredis';
import { config } from './config';

let redisConnection: Redis;

export const getRedisConnection = (): Redis => {
  if (!redisConnection) {
    redisConnection = new IORedis(config.REDIS_URL);
  }
  return redisConnection;
};

export const closeRedisConnection = (): void => {
  redisConnection.disconnect();
};
