import { CompleteShopingProduct } from './shopingProduct.service';

export const getProductCustomDuty = ({
  amount,
  price,
  product,
}: CompleteShopingProduct): number => {
  if (!product.customDuty) {
    return 0;
  }

  return (amount * price * product.customDuty) / 100;
};
