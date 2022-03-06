import { Product } from '../../src/entities/product.entity';
import { productEntityFactory } from '../helpers/factories/product.factory';
import { ITestDbManager } from '../helpers/testDb.helper';

interface PrepareContextProductOptions {
  testDb: ITestDbManager;
  parentProduct?: Product;
  saveProduct?: boolean;
  vat?: number;
  customDuty?: number;
}

export const prepareContextProduct = async ({
  testDb,
  parentProduct,
  saveProduct = true,
  vat,
  customDuty,
}: PrepareContextProductOptions): Promise<Product> => {
  const product = productEntityFactory({ parentProduct, vat, customDuty });

  if (saveProduct) {
    await testDb.persistProduct(product);
  }

  return product;
};
