import { Product } from '../../src/entities/product.entity';
import {
  ProductRepository,
  ProductRepositoryInterface,
} from '../../src/repositories/product.repository';
import { checkProductTree } from '../helpers/checkProductTree';
import { testDbManager } from '../helpers/testDb.helper';
import { prepareContextProduct } from '../utils/prepareContext/product';

const testDb = testDbManager();

interface PrepareContextResponse {
  allProducts: Product[];
  randomProducts: Product[];
}

const prepareContext = async (): Promise<PrepareContextResponse> => {
  const parentProduct1 = await prepareContextProduct({ testDb });
  const parentProduct2 = await prepareContextProduct({ testDb });
  const childrenProduct1 = await prepareContextProduct({ testDb, parentProduct: parentProduct1 });
  const childrenProduct2 = await prepareContextProduct({ testDb, parentProduct: parentProduct2 });
  const subChildrenProduct1 = await prepareContextProduct({
    testDb,
    parentProduct: childrenProduct1,
    id: 'd8e068d3-5ea2-415e-a0ac-a5978b40dd0c',
  });
  const subChildrenProduct2 = await prepareContextProduct({
    testDb,
    parentProduct: childrenProduct1,
    id: '48d9ca1c-947f-41f0-a246-4ecd4b1a27c6',
  });

  childrenProduct1.subProducts = [subChildrenProduct1, subChildrenProduct2];
  parentProduct1.subProducts = [childrenProduct1];
  parentProduct2.subProducts = [childrenProduct2];

  return {
    allProducts: [parentProduct1, parentProduct2],
    randomProducts: [parentProduct1, childrenProduct1, childrenProduct2, subChildrenProduct2],
  };
};

describe('test product repository', () => {
  let repository: ProductRepositoryInterface;

  beforeAll(async () => {
    await testDb.connect();
    repository = testDb.getConnection().manager.withRepository(ProductRepository);
  });

  beforeEach(async () => {
    await testDb.clear();
  });

  afterAll(async () => {
    await testDb.disconnect();
  });
  describe('test getAll', () => {
    it('should return all products', async () => {
      const { allProducts } = await prepareContext();

      const result = await repository.getAll();
      allProducts.forEach((product) => {
        checkProductTree(
          product,
          result.find((p) => p.id === product.id),
        );
      });
    });
    it('should return no products', async () => {
      const result = await repository.getAll();
      expect(result).toEqual([]);
    });
  });
  describe('test getManyByIds', () => {
    it('should return all products by ids', async () => {
      const { randomProducts } = await prepareContext();
      const productIds: string[] = randomProducts.map(({ id }) => id);

      const result = await repository.getManyByIds(productIds);

      expect(result.length).toBe(randomProducts.length);

      randomProducts.map((randomProduct) => {
        expect(result.find((p) => p.id === randomProduct.id)).toBeDefined();
      });
    });
    it('should return no products', async () => {
      const result = await repository.getManyByIds([]);
      expect(result).toEqual([]);
    });
  });
});
