import { Express } from 'express';
import request from 'supertest';

import { compare } from 'bcrypt';
import { testDbManager } from '../../../helpers/testDb.helper';
import buildTestApp from '../../../helpers/testApp.helper';
import api from '../../../../src/api/';
import { HttpStatuses } from '../../../../src/core/httpStatuses';
import { ErrorCodes } from '../../../../src/api/common/enums/errorCodes.enum';
import { prepareContextUser } from '../../../helpers/prepareContext/user';
import { User } from '../../../../src/entities/user.entity';
import { clearEventEmitterMock, eventEmitterMock } from '../../../mocks/eventEmitter.mock';

const testDb = testDbManager();

describe('updatePassword route', () => {
  let testApp: Express;

  beforeAll(async () => {
    await testDb.connect();
    testApp = buildTestApp(api);
  });

  beforeEach(async () => {
    await testDb.clear();
    clearEventEmitterMock();
  });

  afterAll(async () => {
    await testDb.disconnect();
  });

  test('should return success with code 200', async () => {
    const { user, clearPassword, accessToken } = await prepareContextUser({ testDb });

    const { status } = await request(testApp)
      .patch('/api/password')
      .send({
        currentPassword: clearPassword,
        newPassword: 'Azertyuiop123&é',
        newPasswordVerification: 'Azertyuiop123&é',
      })
      .set('Authorization', `Bearer ${accessToken}`);

    expect(status).toBe(HttpStatuses.OK);

    const userInDatabase = (await testDb.getUser(user.id)) as User;
    expect(userInDatabase).toBeDefined();
    expect(await compare('Azertyuiop123&é', userInDatabase.password)).toBeTruthy();
    expect(eventEmitterMock.emitSendEmail.mock.calls.length).toBe(1);
  });

  test('should return error with code 404 - user not found', async () => {
    const { clearPassword, accessToken } = await prepareContextUser({
      testDb,
      saveUser: false,
    });

    const { status, body } = await request(testApp)
      .patch('/api/password')
      .send({
        currentPassword: clearPassword,
        newPassword: 'Azertyuiop123&é',
        newPasswordVerification: 'Azertyuiop123&é',
      })
      .set('Authorization', `Bearer ${accessToken}`);

    expect(body.code).toEqual(ErrorCodes.USER_NOT_FOUND);
    expect(status).toBe(HttpStatuses.NOT_FOUND);
  });

  test('should return error with code 401 - user blocked', async () => {
    const { user, clearPassword } = await prepareContextUser({ testDb, blocked: true });

    const { status, body } = await request(testApp)
      .post('/api/login')
      .send({ email: user.email, password: clearPassword });

    expect(body.code).toEqual(ErrorCodes.USER_BLOCKED_UNAUTHORIZED);
    expect(status).toBe(HttpStatuses.UNAUTHORIZED);
  });

  test('should return error with code 401 - user disabled', async () => {
    const { clearPassword, accessToken } = await prepareContextUser({ testDb, enabled: false });

    const { status, body } = await request(testApp)
      .patch('/api/password')
      .send({
        currentPassword: clearPassword,
        newPassword: 'Azertyuiop123&é',
        newPasswordVerification: 'Azertyuiop123&é',
      })
      .set('Authorization', `Bearer ${accessToken}`);

    expect(body.code).toEqual(ErrorCodes.USER_NOT_ENABLED_UNAUTHORIZED);
    expect(status).toBe(HttpStatuses.UNAUTHORIZED);
  });

  test('should return error with code 401 - incorrect password', async () => {
    const { clearPassword, accessToken } = await prepareContextUser({ testDb });

    const { status, body } = await request(testApp)
      .patch('/api/password')
      .send({
        currentPassword: `bad_${clearPassword}`,
        newPassword: 'Azertyuiop123&é',
        newPasswordVerification: 'Azertyuiop123&é',
      })
      .set('Authorization', `Bearer ${accessToken}`);

    expect(body.code).toEqual(ErrorCodes.NOT_GOOD_PASSWORD);
    expect(status).toBe(HttpStatuses.UNAUTHORIZED);
  });
});
