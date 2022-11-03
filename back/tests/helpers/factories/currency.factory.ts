import { faker } from '@faker-js/faker';
import { buildFactory } from '../../../src/core/testHelpers';
import { Currency } from '../../../src/entities/currency.entity';

const buildSchema = (): Currency => {
  return {
    id: faker.datatype.string(3),
    name: faker.commerce.productName(),
    value: faker.datatype.number(),
    comment: faker.lorem.sentence(),
    updateDate: faker.date.past(),
  };
};

export const currencyEntityFactory = (args?: Partial<Currency>): Currency =>
  buildFactory<Currency>({
    ...buildSchema(),
  })(args);
