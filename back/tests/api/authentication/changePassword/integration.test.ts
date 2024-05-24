import type { Express } from 'express';
import request from 'supertest';
import { compare } from 'bcrypt';

import { faker } from '@faker-js/faker';
import { testDbManager } from '../../../helpers/testDb.helper';
import buildTestApp from '../../../helpers/testApp.helper';
import { HttpStatuses } from '../../../../src/core/httpStatuses';
import { UserRepository } from '../../../../src/repositories/user.repository';
import { ResponseCodes } from '../../../../src/api/common/enums/responseCodes.enum';
import { prepareContextUser } from '../../../helpers/prepareContext/user';
import { AppDataSource } from '../../../../src/loader/database';
import { changePassword } from '../../../../src/api/authentication/changePassword';
import { passwordRegex } from '../../../../src/api/authentication/common/const/regex';
import { ErrorCodes } from '../../../../src/api/common/enums/errorCodes.enum';
import { redisConnection } from '../../../setupTests';

const testDb = testDbManager();

describe('change password route', () => {
  let testApp: Express;

  beforeAll(async () => {
    await testDb.connect();
    testApp = buildTestApp(changePassword);
  });

  beforeEach(async () => {
    await testDb.clear();
  });

  afterAll(async () => {
    await testDb.disconnect();
  });

  test('should return success with code 200', async () => {
    const { user, accessToken, clearPassword: oldPassword } = await prepareContextUser({ testDb });

    const newPassword = faker.helpers.fromRegExp(passwordRegex);

    const { status, body } = await request(testApp)
      .post('/api/password/change')
      .send({ oldPassword, newPassword })
      .set('Authorization', `Bearer ${accessToken}`);

    const redisKeys = await redisConnection.keys('*');
    const value = await redisConnection.get(redisKeys[0]);

    expect(status).toBe(HttpStatuses.OK);
    expect(value).toBe('0');
    expect(body.code).toEqual(ResponseCodes.USER_PASSWORD_UPDATED);

    const storedUser = await AppDataSource.manager
      .withRepository(UserRepository)
      .getOneById(user.id);

    expect(storedUser).toBeDefined();
    if (storedUser) {
      const isGoodPassword = await compare(newPassword, storedUser.password);
      expect(isGoodPassword).toBeTruthy();
    }
  });

  test('should return error - user blocked', async () => {
    const {
      user,
      accessToken,
      clearPassword: oldPassword,
    } = await prepareContextUser({
      testDb,
      blocked: true,
    });

    const newPassword = faker.helpers.fromRegExp(passwordRegex);

    const { status, body } = await request(testApp)
      .post('/api/password/change')
      .send({ oldPassword, newPassword })
      .set('Authorization', `Bearer ${accessToken}`);

    expect(status).toBe(HttpStatuses.UNAUTHORIZED);
    expect(body.code).toEqual(ErrorCodes.USER_BLOCKED_UNAUTHORIZED);

    const redisKeys = await redisConnection.keys('*');
    const value = await redisConnection.get(redisKeys[0]);

    const storedUser = await AppDataSource.manager
      .withRepository(UserRepository)
      .getOneById(user.id);

    expect(value).toBe('1');
    expect(storedUser).toBeDefined();
    if (storedUser) {
      const isPasswordGoodAndUnchanged = await compare(oldPassword, storedUser.password);
      expect(isPasswordGoodAndUnchanged).toBeTruthy();
    }
  });

  test('should return error - user not enabled', async () => {
    const {
      user,
      accessToken,
      clearPassword: oldPassword,
    } = await prepareContextUser({
      testDb,
      enabled: false,
    });

    const newPassword = faker.helpers.fromRegExp(passwordRegex);

    const { status, body } = await request(testApp)
      .post('/api/password/change')
      .send({ oldPassword, newPassword })
      .set('Authorization', `Bearer ${accessToken}`);

    expect(status).toBe(HttpStatuses.UNAUTHORIZED);
    expect(body.code).toEqual(ErrorCodes.USER_NOT_ENABLED_UNAUTHORIZED);

    const redisKeys = await redisConnection.keys('*');
    const value = await redisConnection.get(redisKeys[0]);

    const storedUser = await AppDataSource.manager
      .withRepository(UserRepository)
      .getOneById(user.id);

    expect(value).toBe('1');
    expect(storedUser).toBeDefined();
    if (storedUser) {
      const isPasswordGoodAndUnchanged = await compare(oldPassword, storedUser.password);
      expect(isPasswordGoodAndUnchanged).toBeTruthy();
    }
  });
});
