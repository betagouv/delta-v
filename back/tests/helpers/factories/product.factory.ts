import { faker } from '@faker-js/faker';
import { buildFactory } from '../../../src/core/testHelpers';
import { Product } from '../../../src/entities/product.entity';

const buildSchema = (): Product => {
  return {
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    info: faker.lorem.paragraph(),
    childrenQuestion: faker.lorem.sentence(),
  };
};

export const productEntityFactory = (args?: Partial<Product>): Product =>
  buildFactory<Product>({
    ...buildSchema(),
  })(args);
