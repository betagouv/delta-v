import { faker } from '@faker-js/faker';
import { LexoRank } from 'lexorank';
import { buildFactory } from '../../../src/core/testHelpers';
import { Product, ProductDisplayTypes, ProductType } from '../../../src/entities/product.entity';

const buildSchema = (): Product => {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    info: faker.lorem.paragraph(),
    childrenQuestion: faker.lorem.sentence(),
    finalProduct: faker.datatype.boolean(),
    productDisplayTypes: ProductDisplayTypes.addable,
    relatedWords: [],
    positionRank: LexoRank.middle().toString(),
    countries: [],
    productType: ProductType.value,
  };
};

export const productEntityFactory = (args?: Partial<Product>): Product =>
  buildFactory<Product>({
    ...buildSchema(),
  })(args);
