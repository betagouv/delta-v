import type { Express } from 'express';
import request from 'supertest';

import { faker } from '@faker-js/faker';
import type { Alpha2Code } from 'i18n-iso-countries';
import { testDbManager } from '../../../helpers/testDb.helper';
import buildTestApp from '../../../helpers/testApp.helper';
import { HttpStatuses } from '../../../../src/core/httpStatuses';
import { prepareContextUser } from '../../../helpers/prepareContext/user';
import api from '../../../../src/api';
import { configEntityFactory } from '../../../helpers/factories/config.factory';
import { Alpha2CodeEnum } from '../../../../src/utils/country.util';

const testDb = testDbManager();

describe('getDefaultCountry route', () => {
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
    const { accessToken, user } = await prepareContextUser({ testDb });

    const config = configEntityFactory({
      userId: user.id,
      defaultCountry: faker.helpers.enumValue(Alpha2CodeEnum) as Alpha2Code,
    });
    await testDb.persistConfig(config);

    const { status, body } = await request(testApp)
      .get(`/api/config/defaultCountry/`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(status).toBe(HttpStatuses.OK);
    expect(body).toEqual({
      defaultCountry: config.defaultCountry,
    });
  });
});
