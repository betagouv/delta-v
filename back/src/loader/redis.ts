import IORedis, { Redis } from 'ioredis';
import { config } from './config';

let redisConnection: Redis;

export const createRedisConnection = (): Redis => {
  return new IORedis(config.REDIS_URL);
};

export const getRedisConnection = (): Redis => {
  if (!redisConnection) {
    redisConnection = createRedisConnection();
  }
  return redisConnection;
};

export const closeRedisConnection = (): void => {
  redisConnection.disconnect();
};
