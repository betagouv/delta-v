import { Product, ProductDisplayTypes, ProductType } from '../../../entities/product.entity';
import { sortProducts } from '../../../utils/product.util';
import { AmountProduct } from '../../simulator/services/amountProducts/globalAmount.service';

export interface SerializedProduct {
  id: string;
  name: string;
  icon?: string;
  info?: string;
  radioValue?: string;
  finalProduct: boolean;
  productType: ProductType;
  amountProduct?: AmountProduct;
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
  amountProduct: product.amountProduct,
  productType: product.productType,
  productDisplayTypes: product.productDisplayTypes,
  info: product.info,
  childrenQuestion: product.childrenQuestion,
  customDuty: product.customDuty,
  vat: product.vat,
  nomenclatures: product.nomenclatures,
  relatedWords: product.relatedWords,
  subProducts: product.subProducts?.sort(sortProducts).map(productSerializer),
});
