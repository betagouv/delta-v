import currency from 'currency.js';
import { Product } from '../../../entities/product.entity';
import productNotFoundError from '../../common/errors/productNotFound.error';

export interface ShopingProduct {
  id: string;
  amount: number;
  price: number;
}

export interface CompleteShopingProduct extends ShopingProduct {
  product: Product;
}

const getCompleteShopingProduct = (
  shopingProduct: ShopingProduct,
  products: Product[],
): CompleteShopingProduct => {
  const currentProduct = products.find((product) => product.id === shopingProduct.id);

  if (!currentProduct) {
    throw productNotFoundError(shopingProduct.id);
  }

  return {
    ...shopingProduct,
    product: currentProduct,
  };
};

export const getCompleteShopingProducts = (
  shopingProducts: ShopingProduct[],
  products: Product[],
): CompleteShopingProduct[] => {
  return shopingProducts.map((shopingProduct) =>
    getCompleteShopingProduct(shopingProduct, products),
  );
};

export const getTotalProducts = (shopingProducts: ShopingProduct[]): number => {
  return shopingProducts.reduce((total, shopingProduct) => {
    return currency(shopingProduct.amount).multiply(shopingProduct.price).add(total).value;
  }, 0);
};
