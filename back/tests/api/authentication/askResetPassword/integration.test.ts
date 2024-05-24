import type { Express } from 'express';
import request from 'supertest';

import { testDbManager } from '../../../helpers/testDb.helper';
import buildTestApp from '../../../helpers/testApp.helper';
import api from '../../../../src/api';
import { HttpStatuses } from '../../../../src/core/httpStatuses';
import { prepareContextUser } from '../../../helpers/prepareContext/user';
import { ResponseCodes } from '../../../../src/api/common/enums/responseCodes.enum';
import { clearEventEmitterMock, eventEmitterMock } from '../../../mocks/eventEmitter.mock';
import { sendEmailResetPasswordLimiter } from '../../../../src/core/middlewares/rateLimiter/resendEmailLimiter';
import { ErrorCodes } from '../../../../src/api/common/enums/errorCodes.enum';
import { redisConnection } from '../../../setupTests';

const testDb = testDbManager();

describe('askResetPassword route', () => {
  let testApp: Express;

  beforeAll(async () => {
    await testDb.connect();
    testApp = buildTestApp(api);
  });

  beforeEach(async () => {
    await testDb.clear();
    clearEventEmitterMock();
    sendEmailResetPasswordLimiter.resetKey('::ffff:127.0.0.1');
  });

  afterAll(async () => {
    await testDb.disconnect();
  });

  test('should return success with code 200 and send email', async () => {
    const { user } = await prepareContextUser({ testDb });

    const { status, body } = await request(testApp)
      .post('/api/password/ask')
      .send({ email: user.email });

    const redisKeys = await redisConnection.keys('*');
    const value = await redisConnection.get(redisKeys[0]);

    expect(status).toBe(HttpStatuses.OK);
    expect(body.code).toEqual(ResponseCodes.USER_ASK_RESET_PASSWORD);
    expect(value).toBe('1');
    expect(eventEmitterMock.emitSendEmail.mock.calls.length).toBe(1);
  });

  test('should return 200 and send email - user not enabled', async () => {
    const { user } = await prepareContextUser({ testDb, enabled: false });

    const { status, body } = await request(testApp)
      .post('/api/password/ask')
      .send({ email: user.email });

    const redisKeys = await redisConnection.keys('*');
    const value = await redisConnection.get(redisKeys[0]);

    expect(status).toBe(HttpStatuses.OK);
    expect(value).toBe('1');
    expect(body.code).toEqual(ResponseCodes.USER_ASK_RESET_PASSWORD);
    expect(eventEmitterMock.emitSendEmail.mock.calls.length).toBe(1);
  });

  test('should return 200 but do not send email - user not found', async () => {
    const { user } = await prepareContextUser({ testDb, saveUser: false });

    const { status, body } = await request(testApp)
      .post('/api/password/ask')
      .send({ email: user.email });

    const redisKeys = await redisConnection.keys('*');
    const value = await redisConnection.get(redisKeys[0]);

    expect(status).toBe(HttpStatuses.OK);
    expect(body.code).toEqual(ResponseCodes.USER_ASK_RESET_PASSWORD);
    expect(value).toBe('1');
    expect(eventEmitterMock.emitSendEmail.mock.calls.length).toBe(0);
  });

  test('should return 200 but do not send email - user blocked', async () => {
    const { user } = await prepareContextUser({ testDb, blocked: true });

    const { status, body } = await request(testApp)
      .post('/api/password/ask')
      .send({ email: user.email });

    const redisKeys = await redisConnection.keys('*');
    const value = await redisConnection.get(redisKeys[0]);

    expect(status).toBe(HttpStatuses.OK);
    expect(value).toBe('1');
    expect(body.code).toEqual(ResponseCodes.USER_ASK_RESET_PASSWORD);
    expect(eventEmitterMock.emitSendEmail.mock.calls.length).toBe(0);
  });

  test('should return error with code 429 - too many request', async () => {
    const { user } = await prepareContextUser({ testDb });

    await request(testApp).post('/api/password/ask').send({ email: user.email });

    const { status, body } = await request(testApp)
      .post('/api/password/ask')
      .send({ email: user.email });

    const redisKeys = await redisConnection.keys('*');
    const value = await redisConnection.get(redisKeys[0]);

    expect(body.code).toEqual(ErrorCodes.TOO_MANY_REQUESTS_EMAIL_SEND);
    expect(value).toBe('1');
    expect(status).toBe(HttpStatuses.TOO_MANY_REQUESTS);
    expect(eventEmitterMock.emitSendEmail.mock.calls.length).toBe(1);
  });
});
