import { ProductMaximum } from '../globalAmount.service';
import { AmountAlcoholProduct, GroupedAlcohol } from './alcohol.service';

export const getProductMaximumNonEU = (): ProductMaximum[] => [
  {
    maximum: 2,
    groupName: GroupedAlcohol.groupedAlcohol,
    products: [
      {
        productType: AmountAlcoholProduct.softAlcohol,
        ratio: 1,
      },
      {
        productType: AmountAlcoholProduct.strongAlcohol,
        ratio: 2,
      },
    ],
  },
  {
    maximum: 16,
    groupName: AmountAlcoholProduct.beer,
    products: [
      {
        productType: AmountAlcoholProduct.beer,
        ratio: 1,
      },
    ],
  },
  {
    maximum: 4,
    groupName: AmountAlcoholProduct.wine,
    products: [
      {
        productType: AmountAlcoholProduct.wine,
        ratio: 1,
      },
    ],
  },
];

export const getProductMaximumBorder = (): ProductMaximum[] => [
  {
    maximum: 0.5,
    groupName: GroupedAlcohol.groupedAlcohol,
    products: [
      {
        productType: AmountAlcoholProduct.softAlcohol,
        ratio: 1,
      },
      {
        productType: AmountAlcoholProduct.strongAlcohol,
        ratio: 2,
      },
    ],
  },
  {
    maximum: 4,
    groupName: AmountAlcoholProduct.beer,
    products: [
      {
        productType: AmountAlcoholProduct.beer,
        ratio: 1,
      },
    ],
  },
  {
    maximum: 0.5,
    groupName: AmountAlcoholProduct.wine,
    products: [
      {
        productType: AmountAlcoholProduct.wine,
        ratio: 1,
      },
    ],
  },
];

export const getProductMaximumAndorra = (): ProductMaximum[] => [
  {
    maximum: 3,
    groupName: GroupedAlcohol.groupedAlcohol,
    products: [
      {
        productType: AmountAlcoholProduct.softAlcohol,
        ratio: 1,
      },
      {
        productType: AmountAlcoholProduct.strongAlcohol,
        ratio: 2,
      },
    ],
  },
  {
    maximum: Infinity,
    groupName: AmountAlcoholProduct.beer,
    products: [
      {
        productType: AmountAlcoholProduct.beer,
        ratio: 1,
      },
    ],
  },
  {
    maximum: 5,
    groupName: AmountAlcoholProduct.wine,
    products: [
      {
        productType: AmountAlcoholProduct.wine,
        ratio: 1,
      },
    ],
  },
];

export const getProductMaximumEU = (): ProductMaximum[] => [
  {
    maximum: 10,
    groupName: AmountAlcoholProduct.spiritDrink,
    products: [
      {
        productType: AmountAlcoholProduct.spiritDrink,
        ratio: 1,
      },
    ],
  },
  {
    maximum: 20,
    groupName: AmountAlcoholProduct.alcoholIntermediate,
    products: [
      {
        productType: AmountAlcoholProduct.alcoholIntermediate,
        ratio: 1,
      },
    ],
  },
  {
    maximum: 110,
    groupName: AmountAlcoholProduct.beer,
    products: [
      {
        productType: AmountAlcoholProduct.beer,
        ratio: 1,
      },
    ],
  },
];
