import { testDbManager } from './helpers/testDb.helper';
import { buildTestRedis } from './helpers/testRedis.helper';
import { eventEmitterMock } from './mocks/eventEmitter.mock';

const redisHelper = buildTestRedis();

jest.mock('../src/core/eventManager/eventManager', () => {
  return { eventEmitter: eventEmitterMock };
});

export const testDb = testDbManager();

export const redisConnection = redisHelper.connect();

beforeAll(() => {
  redisHelper.connect();
});

beforeEach(async () => {
  await redisHelper.clear();
});

afterAll(async () => {
  await redisHelper.disconnect();
});
