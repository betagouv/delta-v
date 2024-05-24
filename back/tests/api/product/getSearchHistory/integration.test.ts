import type { Express } from 'express';
import request from 'supertest';
import { faker } from '@faker-js/faker';
import { prepareContextUser } from '../../../helpers/prepareContext/user';
import buildTestApp from '../../../helpers/testApp.helper';
import { testDbManager } from '../../../helpers/testDb.helper';
import { HttpStatuses } from '../../../../src/core/httpStatuses';
import { searchProductHistoryEntityFactory } from '../../../helpers/factories/searchProductHistory.factory';
import { getSearchHistory } from '../../../../src/api/product/getSearchHistory';
import { productEntityFactory } from '../../../helpers/factories/product.factory';
import { SerializedGetSearchProductHistory } from '../../../../src/api/product/getSearchHistory/serializer';

const testDb = testDbManager();

describe('get search product history integration', () => {
  let testApp: Express;

  beforeAll(async () => {
    await testDb.connect();
    testApp = buildTestApp(getSearchHistory);
  });

  beforeEach(async () => {
    await testDb.clear();
  });

  afterAll(async () => {
    await testDb.disconnect();
  });

  test('should get product history with success', async () => {
    const { accessToken, user } = await prepareContextUser({ testDb });

    const numberOfSearchHistory = faker.number.int({ min: 0, max: 10 });

    for (let index = 0; index < numberOfSearchHistory; index++) {
      const product = await testDb.persistProduct(productEntityFactory({}));
      await testDb.persistSearchProductHistory(
        searchProductHistoryEntityFactory({
          productId: product.id,
          userId: user.id,
        }),
      );
    }

    const { status, body } = await request(testApp)
      .get(`/api/product/history`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(body).toBeDefined();
    expect(body).toMatchObject<SerializedGetSearchProductHistory>({ ...body });
    expect(body.productsHistory.length).toEqual(numberOfSearchHistory);

    expect(status).toBe(HttpStatuses.OK);
  });
});
