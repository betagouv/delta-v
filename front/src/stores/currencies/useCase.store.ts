/* eslint-disable import/no-cycle */

import { StoreSlice } from '../store';
import { getCurrenciesRequest } from '@/api/lib/currencies';

export interface CurrenciesUseCaseSlice {
  getCurrenciesResponse: () => Promise<void>;
}

export const createUseCaseCurrencySlice: StoreSlice<CurrenciesUseCaseSlice> = (set) => ({
  getCurrenciesResponse: async () => {
    const currencies = await getCurrenciesRequest();

    set((state: any) => {
      const newState = { ...state };
      newState.currencies.appState.currencies = currencies;
      return newState;
    });
  },
});
