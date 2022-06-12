import create from 'zustand';
import { persist } from 'zustand/middleware';

import { SvgNames } from '@/components/common/SvgIcon';
import axios from '@/config/axios';

export interface Product {
  id: string;
  name: string;
  info: string;
  icon?: SvgNames;
  finalProduct: boolean;
  childrenQuestion: string | null;
  nomenclatures: string[] | null;
  customDuty: number | null;
  vat: number | null;
  subProducts: Product[];
}

interface ProductResponse {
  productsResponse: Product[];
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

export const useProductsStore = create<ProductResponse>(
  persist(
    (set: any, get: any) => ({
      error: undefined,
      productsResponse: [],
      findProduct: (id: string) => {
        return findProduct(get().productsResponse, id);
      },
      getProductsResponse: async () => {
        if (get().productsResponse.length > 0) {
          return;
        }
        try {
          if (get().simulateParams && get().simulateParams !== []) {
            return;
          }
          set({ error: undefined });
          const response = await axios.get('/api/product');
          set({ productsResponse: response.data.products as ProductResponse });
        } catch (error: any) {
          set({ error: error?.response?.data });
        }
      },
    }),
    {
      name: 'product-storage',
    },
  ),
);
