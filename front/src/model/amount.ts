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
    case 'groupedAlcohol':
      return 'Alcool';
    case 'alcoholIntermediate':
      return 'Alcool intermédiaires';
    case 'spiritDrink':
      return 'Boissons spiritueuses';
    case 'beer':
      return 'Bière';
    case 'wine':
      return 'Vin tranquille';
    case 'sparklingWine':
      return 'Vin mousseux';
    default:
      return '';
  }
};

export const getMessageOverMaximumAmount = (key: string): string => {
  switch (key) {
    case 'allTobaccoProducts':
    case 'cigarette':
    case 'cigarillos':
    case 'cigar':
    case 'tobacco':
      return 'de tabac';
    case 'groupedAlcohol':
    case 'alcoholIntermediate':
    case 'spiritDrink':
    case 'beer':
    case 'wine':
    case 'sparklingWine':
      return "d'alcool";
    default:
      return '';
  }
};

export const getAmountProductType = (amountProduct: AmountProduct): 'alcohol' | 'tobacco' => {
  switch (amountProduct) {
    case AmountProduct.cigarette:
    case AmountProduct.cigarillos:
    case AmountProduct.cigar:
    case AmountProduct.tobacco:
      return 'tobacco';
    case AmountProduct.softAlcohol:
    case AmountProduct.alcoholIntermediate:
    case AmountProduct.strongAlcohol:
    case AmountProduct.spiritDrink:
    case AmountProduct.beer:
    case AmountProduct.wine:
    case AmountProduct.sparklingWine:
      return 'alcohol';
    default:
      return 'alcohol';
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
    case AmountProduct.softAlcohol:
    case AmountProduct.alcoholIntermediate:
    case AmountProduct.strongAlcohol:
    case AmountProduct.spiritDrink:
    case AmountProduct.beer:
    case AmountProduct.wine:
    case AmountProduct.sparklingWine:
      return 'litres';
    default:
      return undefined;
  }
};
