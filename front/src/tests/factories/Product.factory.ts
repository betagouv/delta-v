import { faker } from '@faker-js/faker';

import { buildFactory } from './buildFactory';
import { Product, ProductDisplayTypes, ProductType } from '@/model/product';

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
    subProducts: [],
    countries: [],
    productType: ProductType.value,
    nomenclatures: [
      faker.datatype.number({ min: 1000, max: 9999 }).toString(),
      faker.datatype.number({ min: 1000, max: 9999 }).toString(),
      faker.datatype.number({ min: 1000, max: 9999 }).toString(),
    ],
  };
};

export const productFactory = (args?: Partial<Product>): Product =>
  buildFactory<Product>({
    ...buildSchema(),
  })(args);
