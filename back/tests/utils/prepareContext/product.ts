import { faker } from '@faker-js/faker';
import { Product } from '../../../src/entities/product.entity';
import { getRankFromPosition } from '../../../src/utils/rank.util';
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
  position?: number;
}

export const prepareContextProduct = async ({
  testDb,
  name = faker.commerce.productName(),
  info = faker.lorem.paragraph(),
  parentProduct,
  saveProduct = true,
  vat,
  customDuty,
  position = 1,
}: PrepareContextProductOptions): Promise<Product> => {
  const product = productEntityFactory({
    parentProduct,
    vat,
    customDuty,
    name,
    info,
    positionRank: getRankFromPosition(position),
  });

  if (saveProduct) {
    await testDb.persistProduct(product);
  }

  return product;
};
