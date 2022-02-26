import { Product } from '../../../entities/product.entity';

export interface SerializedProduct {
  id: string;
  name: string;
  info?: string;
  childrenQuestion?: string;
  subProducts?: SerializedProduct[];
}

export const productSerializer = (product: Product): SerializedProduct => ({
  id: product.id,
  name: product.name,
  info: product.info,
  childrenQuestion: product.childrenQuestion,
  subProducts: product.subProducts?.map(productSerializer),
});
