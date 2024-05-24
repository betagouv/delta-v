import type { Express } from 'express';
import request from 'supertest';

import { faker } from '@faker-js/faker';
import { testDbManager } from '../../../helpers/testDb.helper';
import buildTestApp from '../../../helpers/testApp.helper';
import { HttpStatuses } from '../../../../src/core/httpStatuses';
import { prepareContextUser } from '../../../helpers/prepareContext/user';
import api from '../../../../src/api';
import { prepareContextProduct } from '../../../helpers/prepareContext/product';
import { prepareContextFavorite } from '../../../helpers/prepareContext/favorite';

const testDb = testDbManager();

describe('getFavorite route', () => {
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

    const productId = faker.string.uuid();
    const productId2 = faker.string.uuid();
    const productId3 = faker.string.uuid();
    const name = faker.commerce.productName();
    const name2 = faker.commerce.productName();
    const name3 = faker.commerce.productName();
    const product = await prepareContextProduct({ testDb, dataProduct: { id: productId } });
    const product2 = await prepareContextProduct({ testDb, dataProduct: { id: productId2 } });
    const product3 = await prepareContextProduct({ testDb, dataProduct: { id: productId3 } });
    await prepareContextFavorite({
      testDb,
      dataFavorite: { userId: user.id, productId: product.id, name },
    });
    await prepareContextFavorite({
      testDb,
      dataFavorite: { userId: user.id, productId: product2.id, name: name2 },
    });
    const { status, body } = await request(testApp)
      .get(`/api/favorite/`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(status).toBe(HttpStatuses.OK);
    expect(body.favorites).toBeDefined();
    expect(body.favorites).toHaveLength(2);
    expect(body.favorites).toContainEqual({ productId: product.id, name });
    expect(body.favorites).toContainEqual({ productId: product2.id, name: name2 });
    expect(body.favorites).not.toContainEqual({ productId: product3.id, name: name3 });
  });
});
