import { faker } from '@faker-js/faker';
import { AmountProduct } from '../../../../../src/api/common/services/amountProducts/globalAmount.service';
import { DetailedShoppingProduct } from '../../../../../src/api/common/services/detailedShoppingProduct';
import { currencyEntityFactory } from '../../../../helpers/factories/currency.factory';
import { productEntityFactory } from '../../../../helpers/factories/product.factory';

export const getDetailedShoppingProductFromData = (dataProduct: {
  name: string;
  value: number;
}): DetailedShoppingProduct => {
  const detailedShoppingProduct = new DetailedShoppingProduct();
  detailedShoppingProduct.product = productEntityFactory({
    amountProduct: dataProduct.name as AmountProduct,
  });
  detailedShoppingProduct.shoppingProduct = {
    originalValue: dataProduct.value,
    id: faker.string.uuid(),
    customId: faker.string.uuid(),
    customName: dataProduct.name,
    currency: 'EUR',
    alcoholDegree: faker.number.int({ min: 0, max: 100 }),
  };
  detailedShoppingProduct.currency = currencyEntityFactory({ value: 1 });

  return detailedShoppingProduct;
};
