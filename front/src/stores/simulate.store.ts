import { Alpha2Code } from 'i18n-iso-countries';
import create from 'zustand';

import axios from '@/config/axios';

interface SimulateParams {
  border?: boolean;
  age?: number;
  meanOfTransport?: string;
  country?: Alpha2Code;
  shoppingProducts?: ShoppingProduct[];
}

interface ShoppingProduct {
  id: string;
  amount: number;
  price: number;
}

export const useSimulateStore = create((set: any) => ({
  error: undefined,
  simulatorResponse: undefined,
  getsimulatorResponse: async (data: SimulateParams) => {
    try {
      set({ error: undefined });
      const response = await axios.post('/api/simulator', data);
      set({ simulatorResponse: response.data });
    } catch (error: any) {
      set({ error: error?.response?.data });
    }
  },
}));
