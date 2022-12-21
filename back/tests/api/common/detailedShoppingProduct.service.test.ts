import { currencyEntityFactory } from '../../helpers/factories/currency.factory';
import { DetailedShoppingProductFactory } from '../../helpers/factories/detailedShoppingProduct.factory';
import { ShoppingProductFactory } from '../../helpers/factories/shoppingProduct.factory';

describe('detailedShoppingProduct', () => {
  it.each([
    [500, 0.5, 1000],
    [150, 2, 75],
    [1000, 10, 100],
  ])(
    'should calculate good rate - with originalValue = %p, rate = %p and expected result = %p',
    (originalValue, rate, expectedResult) => {
      const detailedShoppingProduct = DetailedShoppingProductFactory({
        shoppingProduct: ShoppingProductFactory({ originalValue }),
        currency: currencyEntityFactory({ value: rate }),
      });

      expect(detailedShoppingProduct.getDefaultCurrencyValue()).toEqual(expectedResult);
    },
  );
});
