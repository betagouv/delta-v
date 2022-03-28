import create from 'zustand';

import { Product } from '@/components/business/productTree';
import axios from '@/config/axios';

interface ProductResponse {
  productsResponse: Product[];
  getProductsResponse: () => Promise<void>;
}

export const useProductsStore = create<ProductResponse>((set: any) => ({
  error: undefined,
  productsResponse: [],
  getProductsResponse: async () => {
    try {
      set({ error: undefined });
      const response = await axios.get('/api/product');
      set({ productsResponse: response.data.products as ProductResponse });
    } catch (error: any) {
      set({ error: error?.response?.data });
    }
  },
}));
