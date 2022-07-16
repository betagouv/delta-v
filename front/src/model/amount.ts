import { AmountProduct } from './product';

export const getAmountCategoryName = (key: string): string => {
  switch (key) {
    case 'allTobaccoProducts':
      return 'Tabac';
    case 'cigarette':
      return 'Cigarettes';
    case 'cigarillos':
      return 'Cigarillos';
    case 'cigar':
      return 'Cigare';
    case 'tobacco':
      return 'Tabac à fumer';
    default:
      return '';
  }
};

export const getUnit = (amountProduct?: AmountProduct): string | undefined => {
  switch (amountProduct) {
    case AmountProduct.cigarette:
    case AmountProduct.cigarillos:
    case AmountProduct.cigar:
      return 'unités';
    case AmountProduct.tobacco:
      return 'grammes';
    default:
      return undefined;
  }
};
