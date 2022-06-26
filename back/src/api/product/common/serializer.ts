import { Product, ProductDisplayTypes } from '../../../entities/product.entity';

export interface SerializedProduct {
  id: string;
  name: string;
  icon?: string;
  info?: string;
  radioValue?: string;
  finalProduct: boolean;
  productDisplayTypes: ProductDisplayTypes;
  childrenQuestion?: string;
  customDuty?: number;
  vat?: number;
  nomenclatures?: string[];
  subProducts?: SerializedProduct[];
  relatedWords: string[];
}

export const productSerializer = (product: Product): SerializedProduct => ({
  id: product.id,
  name: product.name,
  icon: product.icon,
  radioValue: product.radioValue,
  finalProduct: product.finalProduct,
  productDisplayTypes: product.productDisplayTypes,
  info: product.info,
  childrenQuestion: product.childrenQuestion,
  customDuty: product.customDuty,
  vat: product.vat,
  nomenclatures: product.nomenclatures,
  relatedWords: product.relatedWords,
  subProducts: product.subProducts?.map(productSerializer),
});
