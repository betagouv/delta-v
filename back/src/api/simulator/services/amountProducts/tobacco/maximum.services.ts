import { ProductMaximum } from '../globalAmount.service';
import { AmountTobaccoProduct, GroupedTobacco } from './tobacco.service';

export const getProductMaximumNonEU = (): ProductMaximum[] => [
  {
    maximum: 200,
    groupName: GroupedTobacco.allTobaccoProducts,
    products: [
      {
        productType: AmountTobaccoProduct.cigarette,
        ratio: 1,
      },
      {
        productType: AmountTobaccoProduct.cigarillos,
        ratio: 2,
      },
      {
        productType: AmountTobaccoProduct.cigar,
        ratio: 4,
      },
      {
        productType: AmountTobaccoProduct.tobacco,
        ratio: 0.8,
      },
    ],
  },
];

export const getProductMaximumAndorra = (): ProductMaximum[] => [
  {
    maximum: 200,
    groupName: GroupedTobacco.allTobaccoProducts,
    products: [
      {
        productType: AmountTobaccoProduct.cigarette,
        ratio: 1,
      },
      {
        productType: AmountTobaccoProduct.cigarillos,
        ratio: 2,
      },
      {
        productType: AmountTobaccoProduct.cigar,
        ratio: 4,
      },
      {
        productType: AmountTobaccoProduct.tobacco,
        ratio: 0.75,
      },
    ],
  },
];

export const getProductMaximumEU = (): ProductMaximum[] => [
  {
    maximum: 800,
    groupName: AmountTobaccoProduct.cigarette,
    products: [
      {
        productType: AmountTobaccoProduct.cigarette,
        ratio: 1,
      },
    ],
  },
  {
    maximum: 400,
    groupName: AmountTobaccoProduct.cigarillos,
    products: [
      {
        productType: AmountTobaccoProduct.cigarillos,
        ratio: 1,
      },
    ],
  },
  {
    maximum: 200,
    groupName: AmountTobaccoProduct.cigar,
    products: [
      {
        productType: AmountTobaccoProduct.cigar,
        ratio: 1,
      },
    ],
  },
  {
    maximum: 1000,
    groupName: AmountTobaccoProduct.tobacco,
    products: [
      {
        productType: AmountTobaccoProduct.tobacco,
        ratio: 1,
      },
    ],
  },
];
