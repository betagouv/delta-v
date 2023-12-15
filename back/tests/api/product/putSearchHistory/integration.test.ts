import { Express } from 'express';
import request from 'supertest';
import { productEntityFactory } from '../../../helpers/factories/product.factory';
import { prepareContextUser } from '../../../helpers/prepareContext/user';
import buildTestApp from '../../../helpers/testApp.helper';
import { testDbManager } from '../../../helpers/testDb.helper';
import { HttpStatuses } from '../../../../src/core/httpStatuses';
import { putSearchHistory } from '../../../../src/api/product/putSearchHistory';

const testDb = testDbManager();

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

  test('should create search product history with success', async () => {
    const { accessToken } = await prepareContextUser({ testDb });

    const product = productEntityFactory({});

    await testDb.persistProduct(product);

    const { status } = await request(testApp)
      .put(`/api/product/history`)
      .send({ productId: product.id })
      .set('Authorization', `Bearer ${accessToken}`);

    expect(status).toBe(HttpStatuses.OK);
  });
});
