import { ProductEntityInterface } from '../../../src/entities/product.entity';
import { productEntityFactory } from '../factories/product.factory';
import { ITestDbManager } from '../testDb.helper';

interface IPrepareContextProductOptions {
  testDb: ITestDbManager;
  dataProduct?: Partial<ProductEntityInterface>;
  saveProduct?: boolean;
}

export const prepareContextProduct = async ({
  testDb,
  dataProduct = {},
  saveProduct = true,
}: IPrepareContextProductOptions): Promise<ProductEntityInterface> => {
  const product = productEntityFactory(dataProduct);

  if (saveProduct) {
    await testDb.persistProduct(product);
  }

  return product;
};
