import type { Express } from 'express';
import request from 'supertest';

import { testDbManager } from '../../../helpers/testDb.helper';
import buildTestApp from '../../../helpers/testApp.helper';
import { validateEmail } from '../../../../src/api/authentication/validateEmail';
import { HttpStatuses } from '../../../../src/core/httpStatuses';
import { ErrorCodes } from '../../../../src/api/common/enums/errorCodes.enum';
import { ResponseCodes } from '../../../../src/api/common/enums/responseCodes.enum';
import { prepareContextUser } from '../../../helpers/prepareContext/user';

const testDb = testDbManager();

describe('validate email route', () => {
  let testApp: Express;

  beforeAll(async () => {
    await testDb.connect();
    testApp = buildTestApp(validateEmail);
  });

  beforeEach(async () => {
    await testDb.clear();
  });

  afterAll(async () => {
    await testDb.disconnect();
  });

  test('should return success with code 200', async () => {
    const { validationToken, user } = await prepareContextUser({
      testDb,
      enabled: false,
    });

    const { status, body } = await request(testApp)
      .post('/api/email/validate')
      .send({ token: validationToken });

    expect(status).toBe(HttpStatuses.OK);
    expect(body.code).toEqual(ResponseCodes.USER_EMAIL_VALIDATED);

    const dbUser = await testDb.getUser(user.id);
    expect(dbUser).toBeDefined();
    expect(dbUser?.enabled).toBeTruthy();
  });

  test('should return success with code 401 - invalid validation token', async () => {
    const { user } = await prepareContextUser({
      testDb,
      enabled: false,
    });

    const badToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtaWx5LmhpbGxzQGRvdWFuZS5maW5hbmNlcy5nb3V2LmZyIiwidXNlcklkIjoiOGUzMzljOGYtMjE4Ny00NmE5LThjMzAtYWExNWQzZWJjMzMwIiwiaWF0IjoxNjgzNTQ0MjYyLCJleHAiOjE2ODM4MDM0NjJ9.REqn_FKTQxPM3Co2brsthhLo9pgqYetnw89omqtaJ4I';

    const { status, body } = await request(testApp)
      .post('/api/email/validate')
      .send({ token: badToken });

    expect(body.code).toEqual(ErrorCodes.INVALID_TOKEN_UNAUTHORIZED);
    expect(status).toBe(HttpStatuses.UNAUTHORIZED);

    const dbUser = await testDb.getUser(user.id);
    expect(dbUser).toBeDefined();
    expect(dbUser?.enabled).toBeFalsy();
  });

  test('should return success with code 404 - user not found', async () => {
    const { validationToken } = await prepareContextUser({
      testDb,
      saveUser: false,
      enabled: false,
    });

    const { status, body } = await request(testApp)
      .post('/api/email/validate')
      .send({ token: validationToken });

    expect(body.code).toEqual(ErrorCodes.USER_NOT_FOUND);
    expect(status).toBe(HttpStatuses.NOT_FOUND);
  });

  test('should return success with code 401 - user blocked', async () => {
    const { validationToken, user } = await prepareContextUser({
      testDb,
      blocked: true,
      enabled: false,
    });

    const { status, body } = await request(testApp)
      .post('/api/email/validate')
      .send({ token: validationToken });

    expect(body.code).toEqual(ErrorCodes.USER_BLOCKED_UNAUTHORIZED);
    expect(status).toBe(HttpStatuses.UNAUTHORIZED);

    const dbUser = await testDb.getUser(user.id);
    expect(dbUser).toBeDefined();
    expect(dbUser?.enabled).toBeFalsy();
  });
});
