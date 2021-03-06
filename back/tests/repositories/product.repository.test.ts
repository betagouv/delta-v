import { getCustomRepository } from 'typeorm';
import { Product } from '../../src/entities/product.entity';
import ProductRepository, {
  ProductRepositoryInterface,
} from '../../src/repositories/product.repository';
import { testDbManager } from '../helpers/testDb.helper';
import { prepareContextProduct } from '../utils/prepareContext/product';
import { cleanTreeProducts } from '../utils/product.util';

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
  });
  const subChildrenProduct2 = await prepareContextProduct({
    testDb,
    parentProduct: childrenProduct1,
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
    repository = getCustomRepository(ProductRepository);
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
      expect(result).toMatchObject(allProducts.map((product) => cleanTreeProducts(product)));
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
      expect(result).toMatchObject(
        randomProducts.map((product) => cleanTreeProducts(product, false)),
      );
    });
    it('should return no products', async () => {
      const result = await repository.getManyByIds([]);
      expect(result).toEqual([]);
    });
  });
});
