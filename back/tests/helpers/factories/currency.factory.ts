import { faker } from '@faker-js/faker';
import { buildFactory } from '../../../src/core/testHelpers';
import { Currency } from '../../../src/entities/currency.entity';

const buildSchema = (): Currency => {
  return {
    id: faker.string.nanoid(3),
    name: faker.commerce.productName(),
    value: faker.number.float(),
    comment: faker.lorem.sentence(),
    updateDate: faker.date.past(),
  };
};

export const currencyEntityFactory = (args?: Partial<Currency>): Currency =>
  buildFactory<Currency>({
    ...buildSchema(),
  })(args);
