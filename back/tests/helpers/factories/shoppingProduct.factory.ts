import { faker } from '@faker-js/faker';
import { ShoppingProduct } from '../../../src/api/common/services/shoppingProducts';
import { buildFactory } from '../../../src/core/testHelpers';

const buildSchema = (): ShoppingProduct => {
  return {
    id: faker.datatype.uuid(),
    customId: faker.datatype.uuid(),
    customName: faker.commerce.productName(),
    currency: faker.datatype.string(3),
    originalValue: faker.datatype.number(),
  };
};

export const ShoppingProductFactory = (args?: Partial<ShoppingProduct>): ShoppingProduct =>
  buildFactory<ShoppingProduct>({
    ...buildSchema(),
  })(args);
