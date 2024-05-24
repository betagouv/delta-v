import type { Express } from 'express';
import request from 'supertest';
import { compare } from 'bcrypt';

import { testDbManager } from '../../../helpers/testDb.helper';
import buildTestApp from '../../../helpers/testApp.helper';
import { register } from '../../../../src/api/authentication/register';
import { HttpStatuses } from '../../../../src/core/httpStatuses';
import { UserRepository } from '../../../../src/repositories/user.repository';
import { AppDataSource } from '../../../../src/loader/database';
import { ErrorCodes } from '../../../../src/api/common/enums/errorCodes.enum';
import { ResponseCodes } from '../../../../src/api/common/enums/responseCodes.enum';
import { prepareContextUser } from '../../../helpers/prepareContext/user';
import { clearEventEmitterMock, eventEmitterMock } from '../../../mocks/eventEmitter.mock';

const testDb = testDbManager();

describe('register route', () => {
  let testApp: Express;

  beforeAll(async () => {
    await testDb.connect();
    testApp = buildTestApp(register);
  });

  beforeEach(async () => {
    await testDb.clear();
    clearEventEmitterMock();
  });

  afterAll(async () => {
    await testDb.disconnect();
  });

  test('should return success with code 200', async () => {
    const { user, clearPassword } = await prepareContextUser({ testDb, douaneEmail: true });
    const newUserEmail = `new${user.email}`;

    await testDb.persistUser(user);
    const { status, body } = await request(testApp)
      .post('/api/agent/register')
      .send({ email: newUserEmail, password: clearPassword });

    expect(status).toBe(HttpStatuses.OK);
    expect(body.code).toEqual(ResponseCodes.USER_CREATED);

    const storedUser = await AppDataSource.manager
      .withRepository(UserRepository)
      .getOneByEmail(newUserEmail);

    expect(storedUser).toBeDefined();
    if (storedUser) {
      const isGoodPassword = await compare(clearPassword, storedUser.password);
      expect(isGoodPassword).toBeTruthy();
      expect(storedUser.enabled).toBeFalsy();
    }

    expect(eventEmitterMock.emitSendEmail.mock.calls.length).toBe(1);
  });

  test('should return error with code 400 - user already exist', async () => {
    const { user, clearPassword } = await prepareContextUser({ testDb, douaneEmail: true });

    const { status, body } = await request(testApp)
      .post('/api/agent/register')
      .send({ email: user.email, password: clearPassword });

    expect(body.code).toEqual(ErrorCodes.EMAIL_ALREADY_EXIST_BAD_REQUEST);
    expect(status).toBe(HttpStatuses.BAD_REQUEST);

    expect(eventEmitterMock.emitSendEmail.mock.calls.length).toBe(0);
  });
});
