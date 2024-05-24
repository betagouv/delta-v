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
import { prepareContextFavorite } from '../../../helpers/prepareContext/favorite';
import { prepareContextProduct } from '../../../helpers/prepareContext/product';
import { ErrorCodes } from '../../../../src/api/common/enums/errorCodes.enum';

const testDb = testDbManager();

describe('deleteFavorite route', () => {
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

    const product = await prepareContextProduct({ testDb, dataProduct: { id: productId } });
    const product2 = await prepareContextProduct({ testDb, dataProduct: { id: productId2 } });
    await prepareContextFavorite({
      testDb,
      dataFavorite: { productId: product.id, userId: user.id },
    });
    await prepareContextFavorite({
      testDb,
      dataFavorite: { productId: product2.id, userId: user.id },
    });
    const { status, body } = await request(testApp)
      .delete(`/api/favorite/${product2.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(status).toBe(HttpStatuses.OK);
    expect(body.code).toEqual(ResponseCodes.FAVORITE_DELETED);

    const storedFavorite = await AppDataSource.manager
      .withRepository(FavoriteRepository)
      .getOneByUserIdAndProductId(product.id, user.id);

    const storedFavorite2 = await AppDataSource.manager
      .withRepository(FavoriteRepository)
      .getOneByUserIdAndProductId(product2.id, user.id);

    expect(storedFavorite).not.toBeNull();
    expect(storedFavorite2).toBeNull();
  });

  test('should return error with code 404', async () => {
    const { accessToken } = await prepareContextUser({ testDb });

    const productId = faker.string.uuid();

    const product = await prepareContextProduct({ testDb, dataProduct: { id: productId } });
    const { status, body } = await request(testApp)
      .delete(`/api/favorite/${product.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(status).toBe(HttpStatuses.NOT_FOUND);
    expect(body.code).toEqual(ErrorCodes.FAVORITE_NOT_FOUND);
  });
});
