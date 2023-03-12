import { DetailedProduct } from '@/stores/simulator/appState.store';

export const getTotalTax = (detailedProducts: DetailedProduct[]) => {
  detailedProducts.reduce((accumulator, detailedProduct) => {
    return accumulator + detailedProduct.unitTaxes;
  }, 0);
};
