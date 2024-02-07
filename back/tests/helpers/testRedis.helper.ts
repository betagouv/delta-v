import { Redis } from 'ioredis';
import { getRedisConnection } from '../../src/loader/redis';

export interface ITestRedisManager {
  connect: () => Redis;
  disconnect: () => Promise<string>;
  clear: () => Promise<string>;
}

export const buildTestRedis = (): ITestRedisManager => {
  let connection: Redis;

  return {
    connect: (): Redis => {
      connection = getRedisConnection();
      return connection;
    },
    disconnect: (): Promise<string> => connection.quit(),
    clear: (): Promise<string> => connection.flushall(),
  };
};
