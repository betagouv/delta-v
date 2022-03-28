import create from 'zustand';

import axios from '@/config/axios';

interface SimulateParams {
  border?: boolean;
  age: number;
  meanOfTransport: string;
  shopingProducts: ShopingProduct[];
}

interface ShopingProduct {
  id: string;
  amount: number;
  price: number;
}

export const useSimulateStore = create((set: any) => ({
  error: undefined,
  simulateResponse: undefined,
  getSimulateResponse: async (data: SimulateParams) => {
    try {
      set({ error: undefined });
      const response = await axios.post('/api/simulator', data);
      set({ simulateResponse: response.data });
    } catch (error: any) {
      set({ error: error?.response?.data });
    }
  },
}));
