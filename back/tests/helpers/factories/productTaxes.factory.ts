import { faker } from '@faker-js/faker';
import { ProductTaxes, ProductTaxesInterface } from '../../../src/entities/productTaxes.entity';

export const productTaxesEntityFactory = (
  args: Partial<ProductTaxesInterface>,
): ProductTaxesInterface => {
  return new ProductTaxes({
    id: args.id ?? faker.datatype.uuid(),
    name: args.id ?? faker.commerce.productName(),
    amount: args.amount ?? 1,
    customDuty: args.customDuty ?? 5,
    vat: args.vat ?? 20,
    unitPrice: args.unitPrice ?? 100,
  });
};