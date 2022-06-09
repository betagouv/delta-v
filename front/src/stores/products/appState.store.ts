// eslint-disable-next-line import/no-cycle
import { StoreSlice } from '../store';
import { SvgNames } from '@/components/common/SvgIcon';

export interface Product {
  id: string;
  name: string;
  info: string;
  icon?: SvgNames;
  finalProduct: boolean;
  productDisplayTypes: ProductDisplayTypes;
  childrenQuestion: string | null;
  nomenclatures: string[] | null;
  customDuty: number | null;
  vat: number | null;
  subProducts: Product[];
}

export enum ProductDisplayTypes {
  category = 'category',
  notManaged = 'not-managed',
  addable = 'addable',
  radio = 'radio',
  radioCard = 'radio-card',
}

export interface ProductsAppStateSlice {
  products: {
    appState: {
      products: Product[];
      updateDate?: Date;
    };
  };
}

export const PRODUCT_EMPTY_STATE = {
  products: [],
};

export const createProductsAppStateSlice: StoreSlice<ProductsAppStateSlice> = () => ({
  products: {
    appState: PRODUCT_EMPTY_STATE,
  },
});
