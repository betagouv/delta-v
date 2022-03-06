import { CompleteShopingProduct } from './shopingProduct.service';

export const getProductVat = ({ amount, price, product }: CompleteShopingProduct): number => {
  if (!product.vat) {
    return 0;
  }

  return (amount * price * product.vat) / 100;
};
