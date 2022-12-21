/* eslint-disable import/no-cycle */

import axios from 'axios';

import { StoreSlice } from '../store';

export interface CurrenciesUseCaseSlice {
  getCurrenciesResponse: () => Promise<void>;
}

export const createUseCaseCurrencySlice: StoreSlice<CurrenciesUseCaseSlice> = (set) => ({
  getCurrenciesResponse: async () => {
    const response = await axios.get('/api/currency');

    set((state: any) => {
      const newState = { ...state };
      newState.currencies.appState.currencies = response.data.currencies;
      return newState;
    });
  },
});
