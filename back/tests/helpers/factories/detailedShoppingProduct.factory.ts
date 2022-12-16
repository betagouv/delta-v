import { faker } from '@faker-js/faker';
import { DetailedShoppingProduct } from '../../../src/api/common/services/detailedShoppingProduct';
import { ShoppingProduct } from '../../../src/api/common/services/shoppingProducts';
import { Currency } from '../../../src/entities/currency.entity';
import { Product } from '../../../src/entities/product.entity';
import { currencyEntityFactory } from './currency.factory';
import { productEntityFactory } from './product.factory';

interface DeclarationFactoryOptions {
  shoppingProduct?: Partial<ShoppingProduct>;
  product?: Partial<Product>;
  currency?: Partial<Currency>;
}

export const DetailedShoppingProductFactory = ({
  shoppingProduct,
  product,
  currency,
}: DeclarationFactoryOptions): DetailedShoppingProduct => {
  const detailedShoppingProduct = new DetailedShoppingProduct();
  detailedShoppingProduct.shoppingProduct = {
    id: faker.datatype.uuid(),
    customId: faker.datatype.uuid(),
    originalValue: faker.datatype.number({ min: 1, max: 1000, precision: 1 }),
    currency: 'EUR',
    customName: faker.commerce.productName(),
    ...shoppingProduct,
  };
  detailedShoppingProduct.product = {
    ...productEntityFactory(),
    ...product,
  };
  detailedShoppingProduct.currency = {
    ...currencyEntityFactory({ value: 1 }),
    ...currency,
  };

  return detailedShoppingProduct;
};
