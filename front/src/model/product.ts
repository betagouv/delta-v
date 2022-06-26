import { SvgNames } from '@/components/common/SvgIcon';

export interface Product {
  id: string;
  name: string;
  radioValue?: string;
  info: string;
  icon?: SvgNames;
  finalProduct: boolean;
  productDisplayTypes: ProductDisplayTypes;
  childrenQuestion: string | null;
  nomenclatures?: string[] | null;
  customDuty?: number | null;
  vat?: number | null;
  subProducts: Product[];
  relatedWords: string[];
  related?: string;
}

export enum ProductDisplayTypes {
  category = 'category',
  notManaged = 'not-managed',
  addable = 'addable',
  radio = 'radio',
  radioCard = 'radio-card',
}
