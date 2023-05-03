import { Express } from 'express';
import request from 'supertest';

import { testDbManager } from '../../../helpers/testDb.helper';
import buildTestApp from '../../../helpers/testApp.helper';
import { login } from '../../../../src/api/authentication/login';
import { HttpStatuses } from '../../../../src/core/httpStatuses';
import { ErrorCodes } from '../../../../src/api/common/enums/errorCodes.enum';
import { prepareContextUser } from '../../../helpers/prepareContext/user';
import { verifyRefreshToken } from '../../../../src/core/jwt/refreshToken';
import { verifyAccessToken } from '../../../../src/core/jwt/accessToken';

const testDb = testDbManager();

describe('login route', () => {
  let testApp: Express;

  beforeAll(async () => {
    await testDb.connect();
    testApp = buildTestApp(login);
  });

  beforeEach(async () => {
    await testDb.clear();
  });

  afterAll(async () => {
    await testDb.disconnect();
  });

  test('should return success with code 200', async () => {
    const { user, clearPassword } = await prepareContextUser({ testDb });

    const { status, body } = await request(testApp)
      .post('/api/login')
      .send({ email: user.email, password: clearPassword });

    expect(status).toBe(HttpStatuses.OK);
    expect(body.accessToken).toBeDefined();
    expect(body.refreshToken).toBeDefined();

    const authObjectAccess = await verifyAccessToken(body.accessToken);
    expect(authObjectAccess).toMatchObject({ userId: user.id, email: user.email });

    const authObjectRefresh = await verifyRefreshToken(body.refreshToken);
    expect(authObjectRefresh).toMatchObject({ userId: user.id, email: user.email });
  });

  test('should return error with code 404 - user not found', async () => {
    const { user, clearPassword } = await prepareContextUser({ testDb, saveUser: false });

    const { status, body } = await request(testApp)
      .post('/api/login')
      .send({ email: user.email, password: clearPassword });

    expect(body.code).toEqual(ErrorCodes.BAD_CREDENTIALS);
    expect(status).toBe(HttpStatuses.UNAUTHORIZED);
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
    const { user, clearPassword } = await prepareContextUser({ testDb, enabled: false });

    const { status, body } = await request(testApp)
      .post('/api/login')
      .send({ email: user.email, password: clearPassword });

    expect(body.code).toEqual(ErrorCodes.USER_NOT_ENABLED_UNAUTHORIZED);
    expect(status).toBe(HttpStatuses.UNAUTHORIZED);
  });

  test('should return error with code 401 - incorrect password', async () => {
    const { user, clearPassword } = await prepareContextUser({ testDb });

    const { status, body } = await request(testApp)
      .post('/api/login')
      .send({ email: user.email, password: `bad_${clearPassword}` });

    expect(body.code).toEqual(ErrorCodes.BAD_CREDENTIALS);
    expect(status).toBe(HttpStatuses.UNAUTHORIZED);
  });

  test('should return error with code 401 - incorrect email', async () => {
    const { user, clearPassword } = await prepareContextUser({ testDb });

    const { status, body } = await request(testApp)
      .post('/api/login')
      .send({ email: `bad.${user.email}`, password: clearPassword });

    expect(body.code).toEqual(ErrorCodes.BAD_CREDENTIALS);
    expect(status).toBe(HttpStatuses.UNAUTHORIZED);
  });
});
