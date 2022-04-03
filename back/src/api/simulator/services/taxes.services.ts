import {
  LIMIT_UNIQUE_CUSTOM_DUTY,
  ProductTaxes,
  ProductTaxesInterface,
  UNIQUE_CUSTOM_DUTY,
} from '../../../entities/productTaxes.entity';
import { manageFreeProducts } from './freeProduct.service';

const getTotalProductsTaxes = (productsTaxes: ProductTaxesInterface[]): number => {
  return getTotalProductsVat(productsTaxes) + getTotalProductsCustomDuty(productsTaxes);
};

export const getTotalProductsVat = (productsTaxes: ProductTaxesInterface[]): number => {
  return productsTaxes.reduce((total, ProductTaxes) => {
    return total + ProductTaxes.getTotalVat();
  }, 0);
};

export const getTotalProductsCustomDuty = (
  ProductsTaxesDetails: ProductTaxesInterface[],
): number => {
  return ProductsTaxesDetails.reduce((total, productTaxesDetails) => {
    return total + productTaxesDetails.getTotalCustomDuty();
  }, 0);
};

interface ManageProductTaxeDetailsOptions {
  total: number;
  franchiseAmount: number;
  productsTaxes: ProductTaxesInterface[];
}

export const manageProductTaxeDetails = ({
  total,
  franchiseAmount,
  productsTaxes,
}: ManageProductTaxeDetailsOptions): ProductTaxesInterface[] => {
  if (total < franchiseAmount) {
    return productsTaxes.map((product) => product.resetFreeTaxeDetails());
  }

  const defaultTaxeProducts = manageFreeProducts({ franchiseAmount, productsTaxes });
  const defaultTotalTaxes = getTotalProductsTaxes(defaultTaxeProducts);
  if (total < LIMIT_UNIQUE_CUSTOM_DUTY) {
    const uniqueRateProducts = productsTaxes.map((product) => {
      const newProduct = new ProductTaxes({}).setFromProductTaxes(product);
      newProduct.setCustomDuty(UNIQUE_CUSTOM_DUTY);
      return newProduct;
    });
    const uniqueRateTaxeProducts = manageFreeProducts({
      franchiseAmount,
      productsTaxes: uniqueRateProducts,
    });
    const uniqueRateTotalTaxes = getTotalProductsTaxes(uniqueRateTaxeProducts);

    if (uniqueRateTotalTaxes < defaultTotalTaxes) {
      return uniqueRateTaxeProducts;
    }
  }

  return defaultTaxeProducts;
};
