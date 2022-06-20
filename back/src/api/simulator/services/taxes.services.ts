import currency from 'currency.js';
import {
  LIMIT_UNIQUE_CUSTOM_DUTY,
  ProductTaxes,
  ProductTaxesInterface,
  UNIQUE_CUSTOM_DUTY,
} from '../../../entities/productTaxes.entity';
import { manageFreeProducts } from './freeProduct.service';

const getTotalProductsTaxes = (productsTaxes: ProductTaxesInterface[]): number => {
  return currency(getTotalProductsVat(productsTaxes)).add(getTotalProductsCustomDuty(productsTaxes))
    .value;
};

export const getTotalProductsVat = (productsTaxes: ProductTaxesInterface[]): number => {
  return productsTaxes.reduce((total, ProductTaxes) => {
    return currency(total).add(ProductTaxes.getUnitVat()).value;
  }, 0);
};

export const getTotalProductsCustomDuty = (
  ProductsTaxesDetails: ProductTaxesInterface[],
): number => {
  return ProductsTaxesDetails.reduce((total, productTaxesDetails) => {
    return currency(total).add(productTaxesDetails.getUnitCustomDuty()).value;
  }, 0);
};

interface ManageProductTaxesDetailsOptions {
  total: number;
  franchiseAmount: number;
  productsTaxes: ProductTaxesInterface[];
}

export const manageProductTaxesDetails = ({
  total,
  franchiseAmount,
  productsTaxes,
}: ManageProductTaxesDetailsOptions): ProductTaxesInterface[] => {
  if (total <= franchiseAmount) {
    return productsTaxes.map((product) => product.resetFreeTaxesDetails());
  }

  const cloneProductsTaxes = productsTaxes.map((product) =>
    new ProductTaxes({}).setFromProductTaxes(product),
  );

  const defaultTaxesProducts = manageFreeProducts({
    franchiseAmount,
    productsTaxes: cloneProductsTaxes,
  });

  const defaultTotalTaxes = getTotalProductsTaxes(defaultTaxesProducts);

  if (total <= LIMIT_UNIQUE_CUSTOM_DUTY) {
    const uniqueRateProducts = productsTaxes.map((product) => {
      const newProduct = new ProductTaxes({}).setFromProductTaxes(product);
      newProduct.setCustomDuty(UNIQUE_CUSTOM_DUTY);
      return newProduct;
    });
    const uniqueRateTaxesProducts = manageFreeProducts({
      franchiseAmount,
      productsTaxes: uniqueRateProducts,
    });
    const uniqueRateTotalTaxes = getTotalProductsTaxes(uniqueRateTaxesProducts);

    if (uniqueRateTotalTaxes <= defaultTotalTaxes) {
      return uniqueRateTaxesProducts;
    }
  }

  return defaultTaxesProducts;
};
