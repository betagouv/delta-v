/* eslint-disable import/no-cycle */
import dayjs from 'dayjs';

import { StoreSlice } from '../store';
import axios from '@/config/axios';
import { Product } from '@/model/product';
import { advancedSearch, SearchType } from '@/utils/search';

export interface ProductsUseCaseSlice {
  findProduct: (id: string) => Product | undefined;
  searchProducts: (searchValue: string) => SearchType<Product>[];
  getProductsResponse: () => Promise<void>;
}

const getFlattenProducts = (products: Product[]): Product[] => {
  let subProducts: Product[] = [];

  return products
    .map((product) => {
      const p = { ...product }; // use spread operator
      if (p.subProducts && p.subProducts.length) {
        subProducts = [...subProducts, ...p.subProducts];
      }
      p.subProducts = [];
      return p;
    })
    .concat(subProducts.length ? getFlattenProducts(subProducts) : subProducts)
    .map((product) => {
      const p = { ...product };
      p.related = product.relatedWords.join(',');
      return p;
    });
};

const findProduct = (products: Product[], id: string): Product | undefined => {
  let existingProduct;
  products.forEach((product) => {
    const productExist = product.id === id;
    if (productExist) {
      existingProduct = product;
      return;
    }
    if (product.subProducts.length > 0) {
      // eslint-disable-next-line unused-imports/no-unused-vars
      const productFind = findProduct(product.subProducts, id);
      if (productFind) {
        existingProduct = productFind;
      }
    }
  });

  return existingProduct;
};

export const createUseCaseProductSlice: StoreSlice<ProductsUseCaseSlice> = (set, get) => ({
  findProduct: (id: string) => {
    return findProduct(get().products.appState.products, id);
  },
  getProductsResponse: async () => {
    const { updateDate } = get().products.appState;
    const difference = updateDate ? dayjs().diff(updateDate, 'seconds') : Infinity;

    if (get().products.appState.products.length > 0 && difference < 20) {
      return;
    }
    const response = await axios.get('/api/product');

    set((state: any) => {
      const newState = { ...state };
      newState.products.appState.products = response.data.products;
      newState.products.appState.flattenProducts = getFlattenProducts(response.data.products);
      newState.products.appState.updateDate = new Date();
      return newState;
    });
  },
  searchProducts: (searchValue: string) => {
    const products = get().products.appState.flattenProducts;
    return advancedSearch({ searchValue, searchList: products, searchKey: ['relatedWords'] });
  },
});
