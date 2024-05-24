import type { Express } from 'express';
import request from 'supertest';
import { compare } from 'bcrypt';

import { testDbManager } from '../../../helpers/testDb.helper';
import buildTestApp from '../../../helpers/testApp.helper';
import { resetPassword } from '../../../../src/api/authentication/resetPassword';
import { HttpStatuses } from '../../../../src/core/httpStatuses';
import { UserRepository } from '../../../../src/repositories/user.repository';
import { ErrorCodes } from '../../../../src/api/common/enums/errorCodes.enum';
import { ResponseCodes } from '../../../../src/api/common/enums/responseCodes.enum';
import { prepareContextUser } from '../../../helpers/prepareContext/user';
import { AppDataSource } from '../../../../src/loader/database';

const testDb = testDbManager();

describe('reset password route', () => {
  let testApp: Express;

  beforeAll(async () => {
    await testDb.connect();
    testApp = buildTestApp(resetPassword);
  });

  beforeEach(async () => {
    await testDb.clear();
  });

  afterAll(async () => {
    await testDb.disconnect();
  });

  test('should return success with code 200', async () => {
    const { resetPasswordToken, user } = await prepareContextUser({ testDb });

    const newPassword = 'NewPassword95*';

    const { status, body } = await request(testApp)
      .post('/api/password/reset')
      .send({ token: resetPasswordToken, password: newPassword });

    expect(status).toBe(HttpStatuses.OK);
    expect(body.code).toEqual(ResponseCodes.USER_PASSWORD_RESET);

    const storedUser = await AppDataSource.manager
      .withRepository(UserRepository)
      .getOneById(user.id);

    expect(storedUser).toBeDefined();
    if (storedUser) {
      const isGoodPassword = await compare(newPassword, storedUser.password);
      expect(isGoodPassword).toBeTruthy();
      expect(storedUser.enabled).toBeTruthy();
    }
  });

  test('should return error - invalid token', async () => {
    const { user, accessToken } = await prepareContextUser({ testDb });

    const newPassword = 'NewPassword95*';
    const invalidToken = accessToken;

    const { status, body } = await request(testApp)
      .post('/api/password/reset')
      .send({ token: invalidToken, password: newPassword });

    expect(status).toBe(HttpStatuses.UNAUTHORIZED);
    expect(body.code).toEqual(ErrorCodes.INVALID_TOKEN_UNAUTHORIZED);

    const storedUser = await AppDataSource.manager
      .withRepository(UserRepository)
      .getOneById(user.id);

    expect(storedUser).toBeDefined();
    if (storedUser) {
      const isGoodPassword = await compare(newPassword, storedUser.password);
      expect(isGoodPassword).toBeFalsy();
    }
  });

  test('should return error - user blocked', async () => {
    const { resetPasswordToken, user } = await prepareContextUser({
      testDb,
      blocked: true,
    });

    const newPassword = 'NewPassword95*';

    const { status, body } = await request(testApp)
      .post('/api/password/reset')
      .send({ token: resetPasswordToken, password: newPassword });

    expect(status).toBe(HttpStatuses.UNAUTHORIZED);
    expect(body.code).toEqual(ErrorCodes.USER_BLOCKED_UNAUTHORIZED);

    const storedUser = await AppDataSource.manager
      .withRepository(UserRepository)
      .getOneById(user.id);

    expect(storedUser).toBeDefined();
    if (storedUser) {
      const isGoodPassword = await compare(newPassword, storedUser.password);
      expect(isGoodPassword).toBeFalsy();
    }
  });

  test('should return error - user not enabled', async () => {
    const { resetPasswordToken, user } = await prepareContextUser({
      testDb,
      enabled: false,
    });

    const newPassword = 'NewPassword95*';

    const { status, body } = await request(testApp)
      .post('/api/password/reset')
      .send({ token: resetPasswordToken, password: newPassword });

    expect(status).toBe(HttpStatuses.UNAUTHORIZED);
    expect(body.code).toEqual(ErrorCodes.USER_NOT_ENABLED_UNAUTHORIZED);

    const storedUser = await AppDataSource.manager
      .withRepository(UserRepository)
      .getOneById(user.id);

    expect(storedUser).toBeDefined();
    if (storedUser) {
      const isGoodPassword = await compare(newPassword, storedUser.password);
      expect(isGoodPassword).toBeFalsy();
    }
  });

  test('should return error - user not found', async () => {
    const { resetPasswordToken } = await prepareContextUser({
      testDb,
      saveUser: false,
    });

    const newPassword = 'NewPassword95*';

    const { status, body } = await request(testApp)
      .post('/api/password/reset')
      .send({ token: resetPasswordToken, password: newPassword });

    expect(status).toBe(HttpStatuses.NOT_FOUND);
    expect(body.code).toEqual(ErrorCodes.USER_NOT_FOUND);
  });
});
