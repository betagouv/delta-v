import {
  getCompleteShoppingProduct,
  ShoppingProduct,
} from '../../../../src/api/simulator/services/shoppingProducts';
import { currencyEntityFactory } from '../../../helpers/factories/currency.factory';
import { productEntityFactory } from '../../../helpers/factories/product.factory';

describe('getCompleteShoppingProduct', () => {
  it('should create complete shopping product', () => {
    const productId = '12';
    const currencyId = 'USD';
    const shoppingProduct: ShoppingProduct = {
      id: productId,
      currency: currencyId,
      originalValue: 50,
      customId: 'testos',
      customName: 'test',
    };

    const products = [productEntityFactory({ id: productId })];
    const currencies = [currencyEntityFactory({ id: currencyId, value: 0.5 })];
    const completeShoppingProduct = getCompleteShoppingProduct(
      shoppingProduct,
      products,
      currencies,
    );

    expect(completeShoppingProduct.value).toEqual(100);
  });
});
