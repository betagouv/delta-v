// eslint-disable-next-line import/no-cycle
import type { Alpha2Code } from 'i18n-iso-countries';

// eslint-disable-next-line import/no-cycle
import { StoreSlice } from '../store';
import { Product } from '@/model/product';

export interface ProductsAppStateSlice {
  products: {
    appState: {
      allProducts: Product[];
      products: Product[];
      nomenclatureProducts: Product[];
      favoriteProducts: Product[];
      flattenProducts: Product[];
      flattenNomenclatureProducts: Product[];
      flattenAllProducts: Product[];
      countryForProductsNomenclature: Alpha2Code | undefined;
    };
  };
}

export const PRODUCT_EMPTY_STATE = {
  allProducts: [],
  products: [],
  favoriteProducts: [],
  nomenclatureProducts: [],
  flattenNomenclatureProducts: [],
  flattenProducts: [],
  flattenAllProducts: [],
  countryForProductsNomenclature: undefined,
};

export const createProductsAppStateSlice: StoreSlice<ProductsAppStateSlice> = () => ({
  products: {
    appState: PRODUCT_EMPTY_STATE,
  },
});
