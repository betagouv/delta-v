import currency from 'currency.js';
import { ShoppingProduct } from '../shoppingProducts';

export const getTotalProducts = (shoppingProducts: ShoppingProduct[]): number => {
  return shoppingProducts.reduce((total, shoppingProduct) => {
    return currency(shoppingProduct.value).add(total).value;
  }, 0);
};
