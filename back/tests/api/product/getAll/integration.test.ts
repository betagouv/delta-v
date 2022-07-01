import request from 'supertest';
import api from '../../../../src/api';
import { Product } from '../../../../src/entities/product.entity';
import buildTestApp from '../../../helpers/testApp.helper';
import { testDbManager } from '../../../helpers/testDb.helper';
import { prepareContextProduct } from '../../../utils/prepareContext/product';
import { cleanTreeProducts } from '../../../utils/product.util';

const testApp = buildTestApp(api);
const testDb = testDbManager();

const prepareContext = async (): Promise<Product[]> => {
  const parentProduct1 = await prepareContextProduct({ testDb, position: 1 });
  const parentProduct2 = await prepareContextProduct({ testDb, position: 2 });
  const childrenProduct1 = await prepareContextProduct({
    testDb,
    parentProduct: parentProduct1,
    position: 1,
  });
  const childrenProduct2 = await prepareContextProduct({
    testDb,
    parentProduct: parentProduct2,
    position: 2,
  });
  const subChildrenProduct1 = await prepareContextProduct({
    testDb,
    parentProduct: childrenProduct1,
    position: 1,
  });
  const subChildrenProduct2 = await prepareContextProduct({
    testDb,
    parentProduct: childrenProduct1,
    position: 2,
  });

  childrenProduct1.subProducts = [subChildrenProduct1, subChildrenProduct2];
  parentProduct1.subProducts = [childrenProduct1];
  parentProduct2.subProducts = [childrenProduct2];

  return [parentProduct1, parentProduct2];
};

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
    const products = await prepareContext();
    const { status, body } = await request(testApp).get('/api/product');
    expect(status).toBe(200);
    expect(body).toMatchObject({ products: products.map((product) => cleanTreeProducts(product)) });
  });
});
