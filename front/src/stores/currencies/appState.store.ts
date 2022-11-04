// eslint-disable-next-line import/no-cycle
import { StoreSlice } from '../store';
import { Currencies } from '@/model/currencies';

export interface CurrenciesAppStateSlice {
  currencies: {
    appState: {
      currencies: Currencies[];
    };
  };
}

export const CURRENCY_EMPTY_STATE = {
  currencies: [],
};

export const createCurrenciesAppStateSlice: StoreSlice<CurrenciesAppStateSlice> = () => ({
  currencies: {
    appState: CURRENCY_EMPTY_STATE,
  },
});
