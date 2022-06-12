/* eslint-disable import/no-cycle */
import dayjs from 'dayjs';

import { StoreSlice } from '../store';
import { Product } from './appState.store';
import axios from '@/config/axios';

export interface ProductsUseCaseSlice {
  findProduct: (id: string) => Product | undefined;
  getProductsResponse: () => Promise<void>;
}

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
    const difference = updateDate ? dayjs().diff(updateDate, 'minute') : Infinity;

    if (get().products.appState.products.length > 0 && difference < 1) {
      return;
    }
    const response = await axios.get('/api/product');

    set((state: any) => {
      const newState = { ...state };
      newState.products.appState.products = response.data.products;
      newState.products.appState.updateDate = new Date();
      return newState;
    });
  },
});
