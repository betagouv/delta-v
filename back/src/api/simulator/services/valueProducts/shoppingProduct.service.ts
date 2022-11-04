import currency from 'currency.js';
import { CompleteShoppingProduct } from '../shoppingProducts';

export const getTotalProducts = (shoppingProducts: CompleteShoppingProduct[]): number => {
  return shoppingProducts.reduce((total, shoppingProduct) => {
    return currency(shoppingProduct.value).add(total).value;
  }, 0);
};
