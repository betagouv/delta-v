import create from 'zustand';
import { persist } from 'zustand/middleware';

import { Product } from '@/components/business/productTree';
import axios from '@/config/axios';

interface ProductResponse {
  productsResponse: Product[];
  getProductsResponse: () => Promise<void>;
}

export const useProductsStore = create<ProductResponse>(
  persist(
    (set: any, get: any) => ({
      error: undefined,
      productsResponse: [],
      getProductsResponse: async () => {
        try {
          console.log(get().simulateParams);

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
