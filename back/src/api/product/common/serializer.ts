import { Product } from '../../../entities/product.entity';

export interface SerializedProduct {
  id: string;
  name: string;
  info?: string;
  childrenQuestion?: string;
  customDuty?: number;
  vat?: number;
  nomenclatures?: string[];
  subProducts?: SerializedProduct[];
}

export const productSerializer = (product: Product): SerializedProduct => ({
  id: product.id,
  name: product.name,
  info: product.info,
  childrenQuestion: product.childrenQuestion,
  customDuty: product.customDuty,
  vat: product.vat,
  nomenclatures: product.nomenclatures,
  subProducts: product.subProducts?.map(productSerializer),
});
