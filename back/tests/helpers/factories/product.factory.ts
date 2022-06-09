import { faker } from '@faker-js/faker';
import { buildFactory } from '../../../src/core/testHelpers';
import { Product, ProductDisplayTypes } from '../../../src/entities/product.entity';

const buildSchema = (): Product => {
  return {
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    info: faker.lorem.paragraph(),
    childrenQuestion: faker.lorem.sentence(),
    finalProduct: faker.datatype.boolean(),
    productDisplayTypes: faker.random.arrayElement([
      ProductDisplayTypes.addable,
      ProductDisplayTypes.category,
      ProductDisplayTypes.notManaged,
      ProductDisplayTypes.radio,
      ProductDisplayTypes.radioCard,
    ]),
  };
};

export const productEntityFactory = (args?: Partial<Product>): Product =>
  buildFactory<Product>({
    ...buildSchema(),
  })(args);
