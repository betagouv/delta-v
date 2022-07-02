import { faker } from '@faker-js/faker';
import { LexoRank } from 'lexorank';
import { buildFactory } from '../../../src/core/testHelpers';
import { Product, ProductDisplayTypes } from '../../../src/entities/product.entity';

const buildSchema = (): Product => {
  return {
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    info: faker.lorem.paragraph(),
    childrenQuestion: faker.lorem.sentence(),
    finalProduct: faker.datatype.boolean(),
    productDisplayTypes: faker.helpers.arrayElement([
      ProductDisplayTypes.addable,
      ProductDisplayTypes.category,
      ProductDisplayTypes.notManaged,
      ProductDisplayTypes.radio,
      ProductDisplayTypes.radioCard,
    ]),
    relatedWords: [],
    positionRank: LexoRank.middle().toString(),
  };
};

export const productEntityFactory = (args?: Partial<Product>): Product =>
  buildFactory<Product>({
    ...buildSchema(),
  })(args);
