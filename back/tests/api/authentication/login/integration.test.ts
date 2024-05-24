import type { Express } from 'express';
import request from 'supertest';

import { testDbManager } from '../../../helpers/testDb.helper';
import buildTestApp from '../../../helpers/testApp.helper';
import api from '../../../../src/api';
import { HttpStatuses } from '../../../../src/core/httpStatuses';
import { ErrorCodes } from '../../../../src/api/common/enums/errorCodes.enum';
import { prepareContextUser } from '../../../helpers/prepareContext/user';
import {
  buildAccessTokenObject,
  buildRefreshTokenObject,
} from '../../../../src/core/jwt/verifyToken';
import { sendEmailResetPasswordLimiter } from '../../../../src/core/middlewares/rateLimiter/resendEmailLimiter';
import { redisConnection } from '../../../setupTests';

const testDb = testDbManager();

describe('login route', () => {
  let testApp: Express;

  beforeAll(async () => {
    await testDb.connect();
    testApp = buildTestApp(api);
  });

  beforeEach(async () => {
    await testDb.clear();
  });

  afterAll(async () => {
    await testDb.disconnect();
  });

  test('should return success with code 200', async () => {
    const { user, clearPassword } = await prepareContextUser({ testDb });
    sendEmailResetPasswordLimiter.resetKey(user.email);

    const { status, body } = await request(testApp)
      .post('/api/login')
      .send({ email: user.email, password: clearPassword });

    const redisKeys = await redisConnection.keys('*');
    const value = await redisConnection.get(redisKeys[0]);

    expect(status).toBe(HttpStatuses.OK);
    expect(body.accessToken).toBeDefined();
    expect(body.refreshToken).toBeDefined();

    const authObjectAccess = await buildAccessTokenObject(body.accessToken);
    expect(authObjectAccess).toMatchObject({ userId: user.id, email: user.email });

    const authObjectRefresh = await buildRefreshTokenObject(body.refreshToken);
    expect(authObjectRefresh).toMatchObject({ userId: user.id, email: user.email });
    expect(value).toBe('0');
  });

  test('should return error with code 404 - user not found', async () => {
    const { user, clearPassword } = await prepareContextUser({ testDb, saveUser: false });
    sendEmailResetPasswordLimiter.resetKey(user.email);

    const { status, body } = await request(testApp)
      .post('/api/login')
      .send({ email: user.email, password: clearPassword });

    expect(body.code).toEqual(ErrorCodes.BAD_CREDENTIALS);
    expect(status).toBe(HttpStatuses.UNAUTHORIZED);
  });

  test('should return error with code 401 - user blocked', async () => {
    const { user, clearPassword } = await prepareContextUser({ testDb, blocked: true });
    sendEmailResetPasswordLimiter.resetKey(user.email);

    const { status, body } = await request(testApp)
      .post('/api/login')
      .send({ email: user.email, password: clearPassword });

    expect(body.code).toEqual(ErrorCodes.USER_BLOCKED_UNAUTHORIZED);
    expect(status).toBe(HttpStatuses.UNAUTHORIZED);
  });

  test('should return error with code 401 - user disabled', async () => {
    const { user, clearPassword } = await prepareContextUser({ testDb, enabled: false });
    sendEmailResetPasswordLimiter.resetKey(user.email);

    const { status, body } = await request(testApp)
      .post('/api/login')
      .send({ email: user.email, password: clearPassword });

    expect(body.code).toEqual(ErrorCodes.USER_NOT_ENABLED_UNAUTHORIZED);
    expect(status).toBe(HttpStatuses.UNAUTHORIZED);
  });

  test('should return error with code 401 - incorrect password', async () => {
    const { user, clearPassword } = await prepareContextUser({ testDb });
    sendEmailResetPasswordLimiter.resetKey(user.email);

    const { status, body } = await request(testApp)
      .post('/api/login')
      .send({ email: user.email, password: `bad_${clearPassword}` });

    expect(body.code).toEqual(ErrorCodes.BAD_CREDENTIALS);
    expect(status).toBe(HttpStatuses.UNAUTHORIZED);
  });

  test('should return error with code 401 - incorrect email', async () => {
    const { user, clearPassword } = await prepareContextUser({ testDb });
    sendEmailResetPasswordLimiter.resetKey(`bad.${user.email}`);

    const { status, body } = await request(testApp)
      .post('/api/login')
      .send({ email: `bad.${user.email}`, password: clearPassword });

    const redisKeys = await redisConnection.keys('*');
    const value = await redisConnection.get(redisKeys[0]);

    expect(body.code).toEqual(ErrorCodes.BAD_CREDENTIALS);
    expect(value).toBe('1');
    expect(status).toBe(HttpStatuses.UNAUTHORIZED);
  });

  test('should return error with code 429 - too many request', async () => {
    const { user, clearPassword } = await prepareContextUser({ testDb });
    sendEmailResetPasswordLimiter.resetKey(user.email);

    for (let i = 0; i < 11; i++) {
      await request(testApp)
        .post('/api/login')
        .send({ email: user.email, password: `bad_${clearPassword}` });
    }

    const redisKeys = await redisConnection.keys('*');
    const value = await redisConnection.get(redisKeys[0]);

    const { status, body } = await request(testApp)
      .post('/api/login')
      .send({ email: user.email, password: `bad_${clearPassword}` });

    expect(body.code).toEqual(ErrorCodes.TOO_MANY_REQUESTS);
    expect(value).toBe('11');
    expect(status).toBe(HttpStatuses.TOO_MANY_REQUESTS);
  });
});
