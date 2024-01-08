import { Express } from 'express';
import request from 'supertest';
import { faker } from '@faker-js/faker';
import { productEntityFactory } from '../../../helpers/factories/product.factory';
import { prepareContextUser } from '../../../helpers/prepareContext/user';
import buildTestApp from '../../../helpers/testApp.helper';
import { testDbManager } from '../../../helpers/testDb.helper';
import { HttpStatuses } from '../../../../src/core/httpStatuses';
import { putSearchHistory } from '../../../../src/api/product/putSearchHistory';
import { searchProductHistoryEntityFactory } from '../../../helpers/factories/searchProductHistory.factory';

const testDb = testDbManager();

const searchValue = faker.commerce.product();

describe('put search product history integration', () => {
  let testApp: Express;

  beforeAll(async () => {
    await testDb.connect();
    testApp = buildTestApp(putSearchHistory);
  });

  beforeEach(async () => {
    await testDb.clear();
  });

  afterAll(async () => {
    await testDb.disconnect();
  });

  test('should put new product history with success - with a searched value', async () => {
    const { accessToken, user } = await prepareContextUser({ testDb });
    const product = productEntityFactory({});
    await testDb.persistProduct(product);

    const { status } = await request(testApp)
      .put(`/api/product/history`)
      .send({
        productId: product.id,
        searchValue,
      })
      .set('Authorization', `Bearer ${accessToken}`);

    const newSearchProductHistory = await testDb.getSearchProductHistory(product.id, user.id);

    expect(newSearchProductHistory).toBeDefined();

    expect(status).toBe(HttpStatuses.OK);
  });

  test('should put new product history with success - without any searched value', async () => {
    const { accessToken, user } = await prepareContextUser({ testDb });
    const product = productEntityFactory({});
    await testDb.persistProduct(product);

    const { status } = await request(testApp)
      .put(`/api/product/history`)
      .send({
        productId: product.id,
        searchValue: undefined,
      })
      .set('Authorization', `Bearer ${accessToken}`);

    const newSearchProductHistory = await testDb.getSearchProductHistory(product.id, user.id);

    expect(newSearchProductHistory).toBeDefined();

    expect(status).toBe(HttpStatuses.OK);
  });

  test('should update product history with success - with a searched value', async () => {
    const { accessToken, user } = await prepareContextUser({ testDb });

    const product = productEntityFactory({});
    await testDb.persistProduct(product);

    const initialSearchProductHistory = searchProductHistoryEntityFactory({
      productId: product.id,
      userId: user.id,
    });

    const { status } = await request(testApp)
      .put(`/api/product/history`)
      .send({ productId: product.id, searchValue })
      .set('Authorization', `Bearer ${accessToken}`);

    const updatedSearchProductHistory = await testDb.getSearchProductHistory(product.id, user.id);

    expect(initialSearchProductHistory).toBeDefined();
    expect(updatedSearchProductHistory).toBeDefined();
    expect(updatedSearchProductHistory?.userId).toEqual(initialSearchProductHistory.userId);
    expect(updatedSearchProductHistory?.productId).toEqual(initialSearchProductHistory.productId);
    expect(updatedSearchProductHistory?.searchDate.getTime()).toBeGreaterThan(
      initialSearchProductHistory.searchDate.getTime(),
    );

    expect(status).toBe(HttpStatuses.OK);
  });

  test('should update product history with success - without any searched value', async () => {
    const { accessToken, user } = await prepareContextUser({ testDb });

    const product = productEntityFactory({});
    await testDb.persistProduct(product);

    const initialSearchProductHistory = searchProductHistoryEntityFactory({
      productId: product.id,
      userId: user.id,
    });

    const { status } = await request(testApp)
      .put(`/api/product/history`)
      .send({ productId: product.id, searchValue: undefined })
      .set('Authorization', `Bearer ${accessToken}`);

    const updatedSearchProductHistory = await testDb.getSearchProductHistory(product.id, user.id);

    expect(initialSearchProductHistory).toBeDefined();
    expect(updatedSearchProductHistory).toBeDefined();
    expect(updatedSearchProductHistory?.userId).toEqual(initialSearchProductHistory.userId);
    expect(updatedSearchProductHistory?.productId).toEqual(initialSearchProductHistory.productId);
    expect(updatedSearchProductHistory?.searchDate.getTime()).toBeGreaterThan(
      initialSearchProductHistory.searchDate.getTime(),
    );

    expect(status).toBe(HttpStatuses.OK);
  });
});
