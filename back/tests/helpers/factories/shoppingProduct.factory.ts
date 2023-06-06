import { faker } from '@faker-js/faker';
import { ShoppingProduct } from '../../../src/api/common/services/shoppingProducts';
import { buildFactory } from '../../../src/core/testHelpers';

const buildSchema = (): ShoppingProduct => {
  return {
    id: faker.string.uuid(),
    customId: faker.string.uuid(),
    customName: faker.commerce.productName(),
    currency: faker.string.sample(3),
    originalValue: faker.number.float(),
  };
};

export const ShoppingProductFactory = (args?: Partial<ShoppingProduct>): ShoppingProduct =>
  buildFactory<ShoppingProduct>({
    ...buildSchema(),
  })(args);
