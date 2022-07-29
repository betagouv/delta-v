// eslint-disable-next-line import/no-cycle
import { StoreSlice } from '../store';
import { Product } from '@/model/product';

export interface ProductsAppStateSlice {
  products: {
    appState: {
      allProducts: Product[];
      products: Product[];
      flattenProducts: Product[];
      updateDate?: Date;
    };
  };
}

export const PRODUCT_EMPTY_STATE = {
  allProducts: [],
  products: [],
  flattenProducts: [],
  updateDate: undefined,
};

export const createProductsAppStateSlice: StoreSlice<ProductsAppStateSlice> = () => ({
  products: {
    appState: PRODUCT_EMPTY_STATE,
  },
});
