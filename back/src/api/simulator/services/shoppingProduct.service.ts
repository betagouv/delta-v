import currency from 'currency.js';
import { Product } from '../../../entities/product.entity';
import productNotFoundError from '../../common/errors/productNotFound.error';

export interface ShoppingProduct {
  id: string;
  name?: string;
  price: number;
}

export interface CompleteShoppingProduct extends ShoppingProduct {
  product: Product;
}

const getCompleteShoppingProduct = (
  shoppingProduct: ShoppingProduct,
  products: Product[],
): CompleteShoppingProduct => {
  const currentProduct = products.find((product) => product.id === shoppingProduct.id);

  if (!currentProduct) {
    throw productNotFoundError(shoppingProduct.id);
  }

  return {
    ...shoppingProduct,
    product: currentProduct,
  };
};

export const getCompleteShoppingProducts = (
  shoppingProducts: ShoppingProduct[],
  products: Product[],
): CompleteShoppingProduct[] => {
  return shoppingProducts.map((shoppingProduct) =>
    getCompleteShoppingProduct(shoppingProduct, products),
  );
};

export const getTotalProducts = (shoppingProducts: ShoppingProduct[]): number => {
  return shoppingProducts.reduce((total, shoppingProduct) => {
    return currency(shoppingProduct.price).add(total).value;
  }, 0);
};
