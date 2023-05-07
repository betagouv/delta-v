import { Express } from 'express';
import request from 'supertest';

import { testDbManager } from '../../../helpers/testDb.helper';
import buildTestApp from '../../../helpers/testApp.helper';
import { askResetPassword } from '../../../../src/api/authentication/askResetPassword';
import { HttpStatuses } from '../../../../src/core/httpStatuses';
import { prepareContextUser } from '../../../helpers/prepareContext/user';
import { ResponseCodes } from '../../../../src/api/common/enums/responseCodes.enum';
import { clearEventEmitterMock, eventEmitterMock } from '../../../mocks/eventEmitter.mock';

const testDb = testDbManager();

describe('askResetPassword route', () => {
  let testApp: Express;

  beforeAll(async () => {
    await testDb.connect();
    testApp = buildTestApp(askResetPassword);
  });

  beforeEach(async () => {
    await testDb.clear();
    clearEventEmitterMock();
  });

  afterAll(async () => {
    await testDb.disconnect();
  });

  test('should return success with code 200', async () => {
    const { user } = await prepareContextUser({ testDb });

    const { status, body } = await request(testApp)
      .post('/api/password/ask')
      .send({ email: user.email });

    expect(status).toBe(HttpStatuses.OK);
    expect(body.code).toEqual(ResponseCodes.USER_ASK_RESET_PASSWORD);
    expect(eventEmitterMock.emitSendEmail.mock.calls.length).toBe(1);
  });

  test('should return success with code 200 - user not found', async () => {
    const { user } = await prepareContextUser({ testDb, saveUser: false });

    const { status, body } = await request(testApp)
      .post('/api/password/ask')
      .send({ email: user.email });

    expect(status).toBe(HttpStatuses.OK);
    expect(body.code).toEqual(ResponseCodes.USER_ASK_RESET_PASSWORD);
    expect(eventEmitterMock.emitSendEmail.mock.calls.length).toBe(0);
  });

  test('should return success with code 200 - user blocked', async () => {
    const { user } = await prepareContextUser({ testDb, blocked: true });

    const { status, body } = await request(testApp)
      .post('/api/password/ask')
      .send({ email: user.email });

    expect(status).toBe(HttpStatuses.OK);
    expect(body.code).toEqual(ResponseCodes.USER_ASK_RESET_PASSWORD);
    expect(eventEmitterMock.emitSendEmail.mock.calls.length).toBe(0);
  });

  test('should return success with code 200 - user not enabled', async () => {
    const { user } = await prepareContextUser({ testDb, enabled: false });

    const { status, body } = await request(testApp)
      .post('/api/password/ask')
      .send({ email: user.email });

    expect(status).toBe(HttpStatuses.OK);
    expect(body.code).toEqual(ResponseCodes.USER_ASK_RESET_PASSWORD);
    expect(eventEmitterMock.emitSendEmail.mock.calls.length).toBe(0);
  });
});
