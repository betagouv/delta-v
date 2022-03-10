import { faker } from '@faker-js/faker';
import { Product } from '../../../src/entities/product.entity';
import { productEntityFactory } from '../../helpers/factories/product.factory';
import { ITestDbManager } from '../../helpers/testDb.helper';

interface PrepareContextProductOptions {
  testDb: ITestDbManager;
  name?: string;
  info?: string;
  parentProduct?: Product;
  saveProduct?: boolean;
  vat?: number;
  customDuty?: number;
}

export const prepareContextProduct = async ({
  testDb,
  name = faker.commerce.productName(),
  info = faker.lorem.paragraph(),
  parentProduct,
  saveProduct = true,
  vat,
  customDuty,
}: PrepareContextProductOptions): Promise<Product> => {
  const product = productEntityFactory({ parentProduct, vat, customDuty, name, info });

  if (saveProduct) {
    await testDb.persistProduct(product);
  }

  return product;
};
