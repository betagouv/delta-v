import { Express } from 'express';
import request from 'supertest';

import { testDbManager } from '../../../helpers/testDb.helper';
import buildTestApp from '../../../helpers/testApp.helper';
import { askEmailValidation } from '../../../../src/api/authentication/askEmailValidation';
import { HttpStatuses } from '../../../../src/core/httpStatuses';
import { ErrorCodes } from '../../../../src/api/common/enums/errorCodes.enum';
import { ResponseCodes } from '../../../../src/api/common/enums/responseCodes.enum';
import { prepareContextUser } from '../../../helpers/prepareContext/user';
import { clearEventEmitterMock, eventEmitterMock } from '../../../mocks/eventEmitter.mock';

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
  });

  afterAll(async () => {
    await testDb.disconnect();
  });

  test('should return success with code 200', async () => {
    const { accessToken } = await prepareContextUser({ testDb, enabled: false });

    const { status, body } = await request(testApp)
      .post('/api/email/validate/ask')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(status).toBe(HttpStatuses.OK);
    expect(body.code).toEqual(ResponseCodes.USER_ASK_EMAIL_VALIDATION);

    expect(eventEmitterMock.emitSendEmailValidateAccount.mock.calls.length).toBe(1);
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

    expect(status).toBe(HttpStatuses.NOT_FOUND);
    expect(body.code).toEqual(ErrorCodes.USER_NOT_FOUND);

    expect(eventEmitterMock.emitSendEmailValidateAccount.mock.calls.length).toBe(0);
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

    expect(eventEmitterMock.emitSendEmailValidateAccount.mock.calls.length).toBe(0);
  });

  test('should return error with code 401, user already enabled', async () => {
    const { accessToken } = await prepareContextUser({
      testDb,
      enabled: true,
    });

    const { status, body } = await request(testApp)
      .post('/api/email/validate/ask')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(status).toBe(HttpStatuses.UNAUTHORIZED);
    expect(body.code).toEqual(ErrorCodes.USER_ALREADY_ENABLED_UNAUTHORIZED);

    expect(eventEmitterMock.emitSendEmailValidateAccount.mock.calls.length).toBe(0);
  });
});
