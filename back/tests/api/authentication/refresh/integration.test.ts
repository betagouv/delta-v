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

const testDb = testDbManager();

describe('refresh route', () => {
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
    const { user, accessToken, refreshToken } = await prepareContextUser({ testDb });

    const { status, body } = await request(testApp)
      .post('/api/refresh')
      .send({ accessToken, refreshToken });

    expect(status).toBe(HttpStatuses.OK);
    expect(body.accessToken).toBeDefined();
    expect(body.refreshToken).toBeDefined();

    const authObjectAccess = await buildAccessTokenObject(body.accessToken);
    expect(authObjectAccess).toMatchObject({ userId: user.id, email: user.email });

    const authObjectRefresh = await buildRefreshTokenObject(body.refreshToken);
    expect(authObjectRefresh).toMatchObject({ userId: user.id, email: user.email });
  });

  test('should return error with code 404 - user not found', async () => {
    const { accessToken, refreshToken } = await prepareContextUser({
      testDb,
      saveUser: false,
    });

    const { status, body } = await request(testApp)
      .post('/api/refresh')
      .send({ accessToken, refreshToken });

    expect(body.code).toEqual(ErrorCodes.INVALID_TOKEN_UNAUTHORIZED);
    expect(status).toBe(HttpStatuses.UNAUTHORIZED);
  });

  test('should return error with code 401 - user blocked', async () => {
    const { accessToken, refreshToken } = await prepareContextUser({ testDb, blocked: true });

    const { status, body } = await request(testApp)
      .post('/api/refresh')
      .send({ accessToken, refreshToken });

    expect(body.code).toEqual(ErrorCodes.USER_BLOCKED_UNAUTHORIZED);
    expect(status).toBe(HttpStatuses.UNAUTHORIZED);
  });

  test('should return error with code 401 - user disabled', async () => {
    const { accessToken, refreshToken } = await prepareContextUser({ testDb, enabled: false });

    const { status, body } = await request(testApp)
      .post('/api/refresh')
      .send({ accessToken, refreshToken });

    expect(body.code).toEqual(ErrorCodes.USER_NOT_ENABLED_UNAUTHORIZED);
    expect(status).toBe(HttpStatuses.UNAUTHORIZED);
  });

  test('should return error with code 401 - incorrect accessToken', async () => {
    const { refreshToken } = await prepareContextUser({ testDb });

    const { status, body } = await request(testApp)
      .post('/api/refresh')
      .send({ accessToken: refreshToken, refreshToken });

    expect(body.code).toEqual(ErrorCodes.INVALID_TOKEN_UNAUTHORIZED);
    expect(status).toBe(HttpStatuses.UNAUTHORIZED);
  });

  test('should return error with code 401 - incorrect refreshToken', async () => {
    const { accessToken } = await prepareContextUser({ testDb });

    const { status, body } = await request(testApp)
      .post('/api/refresh')
      .send({ accessToken, refreshToken: accessToken });

    expect(body.code).toEqual(ErrorCodes.INVALID_TOKEN_UNAUTHORIZED);
    expect(status).toBe(HttpStatuses.UNAUTHORIZED);
  });

  test('should return error with code 401 - expired refreshToken', async () => {
    const { accessToken, refreshToken } = await prepareContextUser({
      testDb,
      expiredRefreshToken: true,
    });

    const { status, body } = await request(testApp)
      .post('/api/refresh')
      .send({ accessToken, refreshToken });

    expect(body.code).toEqual(ErrorCodes.INVALID_TOKEN_UNAUTHORIZED);
    expect(status).toBe(HttpStatuses.UNAUTHORIZED);
  });
});
