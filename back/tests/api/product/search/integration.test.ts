import request from 'supertest';
import api from '../../../../src/api';
import { Product } from '../../../../src/entities/product.entity';
import buildTestApp from '../../../helpers/testApp.helper';
import { testDbManager } from '../../../helpers/testDb.helper';
import { prepareContextProduct } from '../../../utils/prepareContext/product';
import { cleanTreeProducts } from '../../../utils/product.util';

const testApp = buildTestApp(api);
const testDb = testDbManager();

interface PrepareContextResponse {
  allProducts: Product[];
  searchResult: Product[];
}

const prepareContext = async (search: string): Promise<PrepareContextResponse> => {
  const parentProduct1 = await prepareContextProduct({ testDb, name: 'aaaaa' });
  const parentProduct2 = await prepareContextProduct({ testDb, name: `dezde${search}dezd` });
  const childrenProduct1 = await prepareContextProduct({
    testDb,
    parentProduct: parentProduct1,
    name: 'ccccc',
  });
  const childrenProduct2 = await prepareContextProduct({
    testDb,
    parentProduct: parentProduct2,
    name: `${search}gfrgtrg`,
  });
  const subChildrenProduct1 = await prepareContextProduct({
    testDb,
    parentProduct: childrenProduct1,
    name: 'aaaaayyyyy',
  });
  const subChildrenProduct2 = await prepareContextProduct({
    testDb,
    parentProduct: childrenProduct1,
    info: `szdzdz${search}`,
  });

  childrenProduct1.subProducts = [subChildrenProduct1, subChildrenProduct2];
  parentProduct1.subProducts = [childrenProduct1];
  parentProduct2.subProducts = [childrenProduct2];

  return {
    allProducts: [parentProduct1, parentProduct2],
    searchResult: [parentProduct2, childrenProduct2, subChildrenProduct2],
  };
};

describe('test search products API', () => {
  beforeAll(async () => {
    await testDb.connect();
  });

  beforeEach(async () => {
    await testDb.clear();
  });

  afterAll(async () => {
    await testDb.disconnect();
  });
  it('should return match products', async () => {
    const search = 'plastic';
    const { searchResult } = await prepareContext(search);
    const { status, body } = await request(testApp).get('/api/product/search').query({ search });
    expect(status).toBe(200);
    expect(body.products.sort((a: Product, b: Product) => a.id.localeCompare(b.id))).toMatchObject(
      searchResult
        .map((product) => cleanTreeProducts(product))
        .sort((a, b) => a.id.localeCompare(b.id)),
    );
  });
  it('should return no products - no one match', async () => {
    const search = 'voiture';
    const { searchResult } = await prepareContext(search);
    const { status, body } = await request(testApp).get('/api/product/search').query({ search });
    expect(status).toBe(200);
    expect(body.products.sort((a: Product, b: Product) => a.id.localeCompare(b.id))).toMatchObject(
      searchResult
        .map((product) => cleanTreeProducts(product))
        .sort((a, b) => a.id.localeCompare(b.id)),
    );
  });
});
