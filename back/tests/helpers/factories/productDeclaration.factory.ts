import { faker } from '@faker-js/faker';
import { ProductDeclaration, ProductStatus } from '../../../src/entities/declaration.entity';
import { buildFactory } from '../../../src/core/testHelpers';

const buildSchema = (): ProductDeclaration => {
  return {
    id: faker.string.uuid(),
    status: faker.helpers.arrayElement([
      ProductStatus.VALUE_PRODUCT,
      ProductStatus.AMOUNT_PRODUCT,
      ProductStatus.CUSTOM_PRODUCT,
    ]),
    name: faker.commerce.product(),
    customId: faker.string.uuid(),
    customName: faker.commerce.product(),
    originalValue: faker.number.float({ multipleOf: 0.01 }),
    currency: faker.finance.currencyCode(),
    rateCurrency: faker.number.float({ multipleOf: 0.01 }),
    calculatedCustomDuty: faker.number.float({ multipleOf: 0.01 }),
    calculatedVat: faker.number.float({ multipleOf: 0.01 }),
    calculatedTaxes: faker.number.float({ multipleOf: 0.01 }),
    customDuty: faker.number.float({ multipleOf: 0.01 }),
    value: faker.number.float({ multipleOf: 0.01 }),
    vat: faker.number.float({ multipleOf: 0.01 }),
    notManagedProduct: faker.datatype.boolean(),
  };
};

export const productDeclarationFactory = (args?: Partial<ProductDeclaration>): ProductDeclaration =>
  buildFactory<ProductDeclaration>({
    ...buildSchema(),
  })(args);
