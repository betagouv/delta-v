import { faker } from '@faker-js/faker';
import { ProductDeclaration } from '../../../src/entities/declaration.entity';
import { buildFactory } from '../../../src/core/testHelpers';

const buildSchema = (): ProductDeclaration => {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.product(),
    customId: faker.string.uuid(),
    customName: faker.commerce.product(),
    originalValue: faker.number.float({ precision: 0.01 }),
    currency: faker.finance.currencyCode(),
    rateCurrency: faker.number.float({ precision: 0.01 }),
    calculatedCustomDuty: faker.number.float({ precision: 0.01 }),
    calculatedVat: faker.number.float({ precision: 0.01 }),
    calculatedTaxes: faker.number.float({ precision: 0.01 }),
    customDuty: faker.number.float({ precision: 0.01 }),
    value: faker.number.float({ precision: 0.01 }),
    vat: faker.number.float({ precision: 0.01 }),
  };
};

export const productDeclarationFactory = (args?: Partial<ProductDeclaration>): ProductDeclaration =>
  buildFactory<ProductDeclaration>({
    ...buildSchema(),
  })(args);