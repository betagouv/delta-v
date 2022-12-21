import { ProductTaxesInterface } from '../../../../entities/productTaxes.entity';
import { getBestFitProducts } from '../knapsack.service';

interface SeparateFreeAndPaidProductsOptions {
  franchiseAmount: number;
  productsTaxes: ProductTaxesInterface[];
}

interface SeparateFreeAndPaidProductsResponse {
  freeProducts: ProductTaxesInterface[];
  paidProducts: ProductTaxesInterface[];
}

export interface SimpleProduct {
  id: string;
  price: number;
  taxes: number;
}

export const separateFreeAndPaidProducts = ({
  franchiseAmount,
  productsTaxes,
}: SeparateFreeAndPaidProductsOptions): SeparateFreeAndPaidProductsResponse => {
  const productThatCanFitInFranchise = productsTaxes.filter(
    (productTaxesDetails) => productTaxesDetails.unitPrice <= franchiseAmount,
  );
  const productThatCantFitInFranchise = productsTaxes.filter(
    (productTaxesDetails) => productTaxesDetails.unitPrice > franchiseAmount,
  );

  const simpleProducts: SimpleProduct[] = productThatCanFitInFranchise.map(
    (productTaxesDetails) => ({
      id: productTaxesDetails.customId,
      price: productTaxesDetails.unitPrice * 100,
      taxes: productTaxesDetails.getUnitTaxes(),
    }),
  );
  const { fitProducts, notFitProducts } = getBestFitProducts(simpleProducts, franchiseAmount * 100);
  const freeProductsTaxDetails = mergeSimpleProducts(fitProducts, productThatCanFitInFranchise);
  const notFreeProductsTaxDetails = mergeSimpleProducts(
    notFitProducts,
    productThatCanFitInFranchise,
  );

  return {
    freeProducts: freeProductsTaxDetails.map((product) => product.resetFreeTaxesDetails()),
    paidProducts: [...notFreeProductsTaxDetails, ...productThatCantFitInFranchise],
  };
};

export const manageFreeProducts = ({
  franchiseAmount,
  productsTaxes,
}: SeparateFreeAndPaidProductsOptions): ProductTaxesInterface[] => {
  const { freeProducts, paidProducts } = separateFreeAndPaidProducts({
    franchiseAmount,
    productsTaxes,
  });

  return [...freeProducts, ...paidProducts];
};

const mergeSimpleProducts = (
  simpleProducts: SimpleProduct[],
  productsTaxes: ProductTaxesInterface[],
): ProductTaxesInterface[] => {
  return simpleProducts.map((simpleProduct) => {
    return productsTaxes.find((productTaxes) => productTaxes.customId === simpleProduct.id);
  }) as ProductTaxesInterface[];
};
