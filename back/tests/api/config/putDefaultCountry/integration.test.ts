import type { Express } from 'express';
import request from 'supertest';

import { faker } from '@faker-js/faker';
import { testDbManager } from '../../../helpers/testDb.helper';
import buildTestApp from '../../../helpers/testApp.helper';
import { HttpStatuses } from '../../../../src/core/httpStatuses';
import { AppDataSource } from '../../../../src/loader/database';
import { ResponseCodes } from '../../../../src/api/common/enums/responseCodes.enum';
import { prepareContextUser } from '../../../helpers/prepareContext/user';
import api from '../../../../src/api';
import { configEntityFactory } from '../../../helpers/factories/config.factory';
import { Alpha2CodeEnum } from '../../../../src/utils/country.util';
import { ConfigRepository } from '../../../../src/repositories/config.repository';

const testDb = testDbManager();

describe('putDefaultCountry route', () => {
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

  test('should return success with code 200 with new default country', async () => {
    const { accessToken, user } = await prepareContextUser({ testDb });

    const config = configEntityFactory({ userId: user.id });
    await testDb.persistConfig(config);

    const newDefaultCountry = faker.helpers.enumValue(Alpha2CodeEnum);

    const { status, body } = await request(testApp)
      .put('/api/config/defaultCountry/')
      .send({ country: newDefaultCountry })
      .set('Authorization', `Bearer ${accessToken}`);

    expect(status).toBe(HttpStatuses.OK);
    expect(body.code).toEqual(ResponseCodes.DEFAULT_COUNTRY_UPDATED);

    const storedConfig = await AppDataSource.manager
      .withRepository(ConfigRepository)
      .getOne(user.id);

    expect(storedConfig).toBeDefined();
    expect(storedConfig?.userId).toEqual(user.id);
    expect(storedConfig?.defaultCountry).toEqual(newDefaultCountry);
  });
});
