import type { Express } from 'express';
import request from 'supertest';

import { testDbManager } from '../../../helpers/testDb.helper';
import buildTestApp from '../../../helpers/testApp.helper';
import { askEmailValidation } from '../../../../src/api/authentication/askEmailValidation';
import { HttpStatuses } from '../../../../src/core/httpStatuses';
import { ErrorCodes } from '../../../../src/api/common/enums/errorCodes.enum';
import { ResponseCodes } from '../../../../src/api/common/enums/responseCodes.enum';
import { prepareContextUser } from '../../../helpers/prepareContext/user';
import { clearEventEmitterMock, eventEmitterMock } from '../../../mocks/eventEmitter.mock';
import { resendEmailValidationEmailLimiter } from '../../../../src/core/middlewares/rateLimiter/resendEmailLimiter';
import { redisConnection } from '../../../setupTests';

const testDb = testDbManager();

describe('askEmailValidationRouter route', () => {
  let testApp: Express;

  beforeAll(async () => {
    await testDb.connect();
    testApp = buildTestApp(askEmailValidation);
  });

  beforeEach(async () => {
    await testDb.clear();
    clearEventEmitterMock();
    resendEmailValidationEmailLimiter.resetKey('::ffff:127.0.0.1');
  });

  afterAll(async () => {
    await testDb.disconnect();
  });

  test('should return success with code 200 - with jwt', async () => {
    const { accessToken } = await prepareContextUser({ testDb, enabled: false });

    const { status, body } = await request(testApp)
      .post('/api/email/validate/ask')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(status).toBe(HttpStatuses.OK);
    expect(body.code).toEqual(ResponseCodes.USER_ASK_EMAIL_VALIDATION);

    expect(eventEmitterMock.emitSendEmail.mock.calls.length).toBe(1);
  });

  test('should return success with code 200 - with body', async () => {
    const { user } = await prepareContextUser({ testDb, enabled: false });

    const { status, body } = await request(testApp)
      .post('/api/email/validate/ask')
      .send({ email: user.email });

    const redisKeys = await redisConnection.keys('*');
    const value = await redisConnection.get(redisKeys[0]);

    expect(status).toBe(HttpStatuses.OK);
    expect(value).toBe('1');
    expect(body.code).toEqual(ResponseCodes.USER_ASK_EMAIL_VALIDATION);

    expect(eventEmitterMock.emitSendEmail.mock.calls.length).toBe(1);
  });

  test('should return error with code 404, user not found', async () => {
    const { accessToken } = await prepareContextUser({
      testDb,
      saveUser: false,
      enabled: false,
    });

    const { status, body } = await request(testApp)
      .post('/api/email/validate/ask')
      .set('Authorization', `Bearer ${accessToken}`);

    const redisKeys = await redisConnection.keys('*');
    const value = await redisConnection.get(redisKeys[0]);

    expect(status).toBe(HttpStatuses.NOT_FOUND);
    expect(value).toBe('0');
    expect(body.code).toEqual(ErrorCodes.USER_NOT_FOUND);

    expect(eventEmitterMock.emitSendEmail.mock.calls.length).toBe(0);
  });

  test('should return error with code 401, user blocked', async () => {
    const { accessToken } = await prepareContextUser({
      testDb,
      blocked: true,
      enabled: false,
    });

    const { status, body } = await request(testApp)
      .post('/api/email/validate/ask')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(status).toBe(HttpStatuses.UNAUTHORIZED);
    expect(body.code).toEqual(ErrorCodes.USER_BLOCKED_UNAUTHORIZED);

    expect(eventEmitterMock.emitSendEmail.mock.calls.length).toBe(0);
  });

  test('should return error with code 401, user already enabled', async () => {
    const { accessToken } = await prepareContextUser({
      testDb,
      enabled: true,
    });

    const { status, body } = await request(testApp)
      .post('/api/email/validate/ask')
      .set('Authorization', `Bearer ${accessToken}`);

    const redisKeys = await redisConnection.keys('*');
    const value = await redisConnection.get(redisKeys[0]);

    expect(status).toBe(HttpStatuses.UNAUTHORIZED);
    expect(body.code).toEqual(ErrorCodes.USER_ALREADY_ENABLED_UNAUTHORIZED);
    expect(value).toBe('0');

    expect(eventEmitterMock.emitSendEmail.mock.calls.length).toBe(0);
  });

  test('should return error with code 429 - too many request', async () => {
    const { accessToken } = await prepareContextUser({
      testDb,
      enabled: false,
    });

    await request(testApp)
      .post('/api/email/validate/ask')
      .set('Authorization', `Bearer ${accessToken}`);

    const { status, body } = await request(testApp)
      .post('/api/email/validate/ask')
      .set('Authorization', `Bearer ${accessToken}`);

    const redisKeys = await redisConnection.keys('*');
    const value = await redisConnection.get(redisKeys[0]);

    expect(body.code).toEqual(ErrorCodes.TOO_MANY_REQUESTS_EMAIL_SEND);
    expect(status).toBe(HttpStatuses.TOO_MANY_REQUESTS);
    expect(value).toBe('1');
    expect(eventEmitterMock.emitSendEmail.mock.calls.length).toBe(1);
  });
});
