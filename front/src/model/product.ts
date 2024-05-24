import type { Alpha2Code } from 'i18n-iso-countries';

import { SvgNames } from '@/components/molecules/SvgIcon';

export interface Product {
  id: string;
  name: string;
  radioValue?: string;
  info: string;
  icon?: SvgNames;
  finalProduct: boolean;
  productType: ProductType;
  amountProduct?: AmountProduct;
  productDisplayTypes: ProductDisplayTypes;
  countries: Alpha2Code[];
  childrenQuestion: string | null;
  nomenclatures?: string[] | null;
  customDuty?: number | null;
  vat?: number | null;
  subProducts: Product[];
  relatedWords: string[];
  related?: string;
}

export type IdRequiredProduct = Partial<Product> & Pick<Product, 'id'>;

export enum AmountProduct {
  tobaccoCategory = 'tobaccoCategory',
  alcoholCategory = 'alcoholCategory',
  cigarette = 'cigarette',
  cigarillos = 'cigarillos',
  cigar = 'cigar',
  tobacco = 'tobacco',
  strongAlcohol = 'strongAlcohol',
  softAlcohol = 'softAlcohol',
  beer = 'beer',
  wine = 'wine',
  sparklingWine = 'sparklingWine',
  spiritDrink = 'spiritDrink',
  alcoholIntermediate = 'alcoholIntermediate',
}

export enum ProductType {
  amount = 'amount',
  value = 'value',
}

export enum ProductDisplayTypes {
  category = 'category',
  notManaged = 'not-managed',
  addable = 'addable',
  radio = 'radio',
  radioCard = 'radio-card',
}
