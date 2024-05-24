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
import { FavoriteRepository } from '../../../../src/repositories/favorite.repository';
import { prepareContextProduct } from '../../../helpers/prepareContext/product';
import { prepareContextFavorite } from '../../../helpers/prepareContext/favorite';

const testDb = testDbManager();

describe('putFavorite route', () => {
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

  test('should return success with code 200 with favorite name', async () => {
    const { accessToken, user } = await prepareContextUser({ testDb });

    const productId = faker.string.uuid();
    const name = faker.commerce.productName();
    const product = await prepareContextProduct({ testDb, dataProduct: { id: productId } });
    const { status, body } = await request(testApp)
      .put(`/api/favorite/`)
      .send({ productId, name })
      .set('Authorization', `Bearer ${accessToken}`);

    expect(status).toBe(HttpStatuses.OK);
    expect(body.code).toEqual(ResponseCodes.FAVORITE_ADDED);

    const storedFavorite = await AppDataSource.manager
      .withRepository(FavoriteRepository)
      .getOneByUserIdAndProductId(productId, user.id);

    expect(storedFavorite).toBeDefined();
    expect(storedFavorite?.userId).toEqual(user.id);
    expect(storedFavorite?.productId).toEqual(product.id);
    expect(storedFavorite?.name).toEqual(name);
  });

  test('should return success with code 200', async () => {
    const { accessToken, user } = await prepareContextUser({ testDb });

    const productId = faker.string.uuid();
    const name = faker.commerce.productName();
    const product = await prepareContextProduct({ testDb, dataProduct: { id: productId } });
    const { status, body } = await request(testApp)
      .put(`/api/favorite/`)
      .send({ productId, name })
      .set('Authorization', `Bearer ${accessToken}`);

    expect(status).toBe(HttpStatuses.OK);
    expect(body.code).toEqual(ResponseCodes.FAVORITE_ADDED);

    const storedFavorite = await AppDataSource.manager
      .withRepository(FavoriteRepository)
      .getOneByUserIdAndProductId(productId, user.id);

    expect(storedFavorite).toBeDefined();
    expect(storedFavorite?.userId).toEqual(user.id);
    expect(storedFavorite?.productId).toEqual(product.id);
    expect(storedFavorite?.name).toBe(name);
  });

  test('should return success with code 200 even if favorite exists', async () => {
    const { accessToken, user } = await prepareContextUser({ testDb });

    const productId = faker.string.uuid();
    const name = faker.commerce.productName();
    const product = await prepareContextProduct({ testDb, dataProduct: { id: productId } });
    await prepareContextFavorite({
      testDb,
      dataFavorite: { productId: product.id, userId: user.id },
    });
    const { status, body } = await request(testApp)
      .put(`/api/favorite/`)
      .send({ productId, name })
      .set('Authorization', `Bearer ${accessToken}`);

    expect(status).toBe(HttpStatuses.OK);
    expect(body.code).toEqual(ResponseCodes.FAVORITE_ADDED);

    const storedFavorite = await AppDataSource.manager
      .withRepository(FavoriteRepository)
      .getOneByUserIdAndProductId(productId, user.id);

    expect(storedFavorite).toBeDefined();
    expect(storedFavorite?.userId).toEqual(user.id);
    expect(storedFavorite?.productId).toEqual(product.id);
  });
});
