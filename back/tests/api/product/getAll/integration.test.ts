import request from 'supertest';
import api from '../../../../src/api';
import { productEntityFactory } from '../../../helpers/factories/product.factory';
import buildTestApp from '../../../helpers/testApp.helper';
import { testDbManager } from '../../../helpers/testDb.helper';

const testApp = buildTestApp(api);
const testDb = testDbManager();

describe('test get all product API', () => {
  beforeAll(async () => {
    await testDb.connect();
  });

  beforeEach(async () => {
    await testDb.clear();
  });

  afterAll(async () => {
    await testDb.disconnect();
  });
  it('should return all products', async () => {
    const parentProduct1 = productEntityFactory();
    const parentProduct2 = productEntityFactory();
    const childrenProduct1 = productEntityFactory({ parentProduct: parentProduct1 });
    const childrenProduct2 = productEntityFactory({ parentProduct: parentProduct2 });
    const subChildrenProduct1 = productEntityFactory({ parentProduct: childrenProduct1 });
    const subChildrenProduct2 = productEntityFactory({ parentProduct: childrenProduct1 });
    await testDb.persistProduct(parentProduct1);
    await testDb.persistProduct(parentProduct2);
    await testDb.persistProduct(childrenProduct1);
    await testDb.persistProduct(childrenProduct2);
    await testDb.persistProduct(subChildrenProduct1);
    await testDb.persistProduct(subChildrenProduct2);
    const { status, body } = await request(testApp).get('/api/product');
    expect(status).toBe(200);
    expect(body).toMatchObject({
      products: [
        {
          id: parentProduct1.id,
          subProducts: [
            {
              id: childrenProduct1.id,
              subProducts: [
                {
                  id: subChildrenProduct1.id,
                },
                {
                  id: subChildrenProduct2.id,
                },
              ],
            },
          ],
        },
        {
          id: parentProduct2.id,
          subProducts: [
            {
              id: childrenProduct2.id,
            },
          ],
        },
      ],
    });
  });
});
