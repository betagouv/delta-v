import { CompleteShopingProduct, getProductCustomDuty, getProductVat } from '.';

export interface ProductTaxesDetails {
  name: string;
  amount: number;
  unitPrice: number;
  totalPrice: number;
  customDuty: number;
  vat: number;
  totalCustomDuty: number;
  totalVat: number;
}

export const getProductTaxesDetails = (
  completeShopingProduct: CompleteShopingProduct,
): ProductTaxesDetails => {
  const { amount, price, product } = completeShopingProduct;

  return {
    name: product.name,
    amount,
    unitPrice: price,
    totalPrice: amount * price,
    totalCustomDuty: getProductCustomDuty(completeShopingProduct),
    totalVat: getProductVat(completeShopingProduct),
    customDuty: product.customDuty ?? 0,
    vat: product.vat ?? 0,
  };
};

export const getTotalProductsVat = (ProductsTaxesDetails: ProductTaxesDetails[]): number => {
  return ProductsTaxesDetails.reduce((total, productTaxesDetails) => {
    return total + productTaxesDetails.totalVat;
  }, 0);
};

export const getTotalProductsCustomDuty = (ProductsTaxesDetails: ProductTaxesDetails[]): number => {
  return ProductsTaxesDetails.reduce((total, productTaxesDetails) => {
    return total + productTaxesDetails.totalCustomDuty;
  }, 0);
};

export const getTotalCustomDuty = (total: number, totalCustomDuty: number): number => {
  if (total < 700) {
    const uniqueRateCustomDuty = 0.025;
    const uniqueRateTotalCustomDuty = total * uniqueRateCustomDuty;
    return Math.min(uniqueRateTotalCustomDuty, totalCustomDuty);
  }
  return totalCustomDuty;
};
