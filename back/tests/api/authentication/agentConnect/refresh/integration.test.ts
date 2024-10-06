/* eslint-disable @typescript-eslint/no-explicit-any */
import { Express } from 'express';
import request from 'supertest';
import buildTestApp from '../../../../helpers/testApp.helper';
import { testDbManager } from '../../../../helpers/testDb.helper';
import { prepareContextUser } from '../../../../helpers/prepareContext/user';
import api from '../../../../../src/api';
import { clearEventEmitterMock } from '../../../../mocks/eventEmitter.mock';

const testDb = testDbManager();
const mockAccessToken =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im1vY2tLaWQifQ.eyJzdWIiOiIxMjM0NTY3ODkwIiwibm9uY2UiOiJtb2NrTm9uY2UiLCJhdF9oYXNoIjoibW9ja0F0SGFzaCIsImFjciI6ImVpZGFzMiIsImF1ZCI6Im1vY2tDbGllbnRJZCIsImV4cCI6MTY3NTI3MjAwMCwiaWF0IjoxNjc1MjY4NDAwLCJpc3MiOiJodHRwczovL21vY2suYWdlbnRjb25uZWN0LmdvdXYuZnIvYXV0aCIsImdpdmVuX25hbWUiOiJKZWFuIiwidXN1YWxfbmFtZSI6IkR1cG9udCIsImVtYWlsIjoiamVhbi5kdXBvbnRAZXhhbXBsZS5jb20iLCJ1aWQiOiIxMjM0NTY3ODkwIiwiYW1yIjpbInB3ZCJdfQ.SIGNATURE';
const mockRefreshToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibm9uY2UiOiJtb2NrTm9uY2UiLCJhdF9oYXNoIjoibW9ja0F0SGFzaCIsImFjciI6ImVpZGFzMiIsImF1ZCI6Im1vY2tDbGllbnRJZCIsImV4cCI6MTY3NTI3MjAwMCwiaWF0IjoxNjc1MjY4NDAwLCJpc3MiOiJodHRwczovL21vY2suYWdlbnRjb25uZWN0LmdvdXYuZnIvYXV0aCIsImdpdmVuX25hbWUiOiJKZWFuIiwidXN1YWxfbmFtZSI6IkR1cG9udCIsImVtYWlsIjoiamVhbi5kdXBvbnRAZXhhbXBsZS5jb20iLCJ1aWQiOiIxMjM0NTY3ODkwIiwiYW1yIjpbInB3ZCJdfQ.SIGNATURE';

jest.mock('../../../../../src/loader/redis', () => {
  const originalModule = jest.requireActual('../../../../../src/loader/redis');
  return {
    ...originalModule,
    getRedisConnection: jest.fn(() => ({
      call: jest.fn(),
      sendCommand: jest.fn(),
      get: jest.fn().mockResolvedValue(
        JSON.stringify({
          access_token: mockAccessToken,
          id_token: 'mockIdToken',
          refresh_token: mockRefreshToken,
          expires_at: Math.floor(Date.now()) + 36000,
        }),
      ),
      set: jest.fn(),
      del: jest.fn(),
    })),
  };
});

jest.mock('../../../../../src/core/jwt/verifyToken', () => ({
  buildAccessTokenObject: jest.fn().mockResolvedValue({
    userId: 'mockUserId',
    isAgent: true,
    email: 'mock@example.com',
    name: 'mockName',
    lastName: 'mockLastName',
  }),
  buildRefreshTokenObject: jest
    .fn()
    .mockResolvedValue({ userId: 'mockUserId', email: 'mock@example.com' }),
}));

// Mock the entire rateLimiter module with all necessary parts
jest.mock('../../../../../src/core/middlewares/rateLimiter', () => ({
  rateLimiterMiddleware: jest.fn((): ((req: any, res: any, next: any) => void) => (next) => next()),
  RateLimiterType: {
    DEFAULT: 'DEFAULT',
  },
}));

describe('AgentConnect refresh endpoint', () => {
  let testApp: Express;

  beforeAll(async () => {
    await testDb.connect();

    testApp = buildTestApp(api);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    await testDb.clear();
    clearEventEmitterMock();
  });

  afterAll(async () => {
    await testDb.disconnect();
  });

  it.only('should refresh tokens successfully', async () => {
    await prepareContextUser({ testDb });

    const response = await request(testApp).post('/api/agent-connect/refresh').send({
      accessToken: mockAccessToken,
      refreshToken: mockRefreshToken,
      lastRefresh: false,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
    expect(response.body).toHaveProperty('refreshToken');
    expect(response.body).toHaveProperty('lastRefresh');
    expect(response.body).toHaveProperty('timeToLogout');
    expect(response.body.lastRefresh).toBe(true);
    expect(response.body.timeToLogout).toBeCloseTo(36000, -1);
  });
});
