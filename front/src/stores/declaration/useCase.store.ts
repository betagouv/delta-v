import { countries } from 'countries-list';
import { Alpha2Code } from 'i18n-iso-countries';

// eslint-disable-next-line import/no-cycle
import { StoreSlice } from '../store';
// eslint-disable-next-line import/no-cycle
import { MeansOfTransport, DeclarationResponse, DECLARATION_EMPTY_STATE } from './appState.store';
import axios from '@/config/axios';
import { Currencies } from '@/model/currencies';

export interface DeclarationUseCaseSlice {
  validateStep1: (age: number) => void;
  validateStep2: (meanOfTransport: MeansOfTransport) => void;
  validateStep3: (country: Alpha2Code) => void;
  validateStep4: (border: boolean) => void;
  shouldRedirectToAnotherStep: () => [boolean, number | null];
  resetSteps: (step: number) => void;
  declarate: () => void;
}

export const createUseCaseDeclarationSlice: StoreSlice<DeclarationUseCaseSlice> = (set, get) => ({
  validateStep1: (age: number): void => {
    set((state: any) => {
      const newState = { ...state };
      newState.declaration.appState.declarationRequest.age = age;
      return newState;
    });
  },
  validateStep2: (meanOfTransport: MeansOfTransport): void => {
    set((state: any) => {
      const newState = { ...state };
      newState.declaration.appState.declarationRequest.meanOfTransport = meanOfTransport;
      return newState;
    });
  },
  validateStep3: (country: Alpha2Code): void => {
    set((state: any) => {
      const newState = { ...state };
      newState.declaration.appState.declarationRequest.country = country;
      const rawCurrencies = countries[country ?? 'FR'].currency;
      const mainCurrency = rawCurrencies.split(',')[0];
      const defaultCurrency = newState.currencies.appState.currencies.find(
        (currency: Currencies) => currency.id === mainCurrency,
      );

      newState.declaration.appState.declarationRequest.defaultCurrency =
        defaultCurrency?.id ?? 'EUR';

      if (
        country !== 'CH' ||
        state.declaration.appState.declarationRequest.meanOfTransport !== MeansOfTransport.CAR
      ) {
        newState.declaration.appState.declarationRequest.border = false;
      }
      return newState;
    });
  },
  validateStep4: (border: boolean): void => {
    set((state: any) => {
      const newState = { ...state };
      newState.simulator.appState.simulatorRequest.border = border;
      return newState;
    });
  },
  resetSteps: (step: number): void => {
    set((state: any) => {
      const newState = { ...state };
      if (step <= 2) {
        newState.declaration.appState.declarationRequest.meanOfTransport =
          DECLARATION_EMPTY_STATE.declarationRequest.meanOfTransport;
      }
      if (step <= 1) {
        newState.declaration.appState.declarationRequest.age =
          DECLARATION_EMPTY_STATE.declarationRequest.age;
      }
      newState.declaration.appState.declarationRequest.shoppingProducts =
        DECLARATION_EMPTY_STATE.declarationRequest.shoppingProducts;
      newState.declaration.appState.declarationResponse =
        DECLARATION_EMPTY_STATE.declarationResponse;
      return newState;
    });
  },
  declarate: async () => {
    try {
      const declarationData = get().declaration.appState;
      const data = {
        age: declarationData.declarationRequest.age,
        meanOfTransport: declarationData.declarationRequest.meanOfTransport,
        country: declarationData.declarationRequest.country,
        border: declarationData.declarationRequest.border,
      };
      const response = (await axios.post('/api/declaration', data)).data as DeclarationResponse;
      set((state: any) => {
        const newState = { ...state };
        newState.declaration.appState.declarationResponse = response;
        return newState;
      });
    } catch (error: any) {
      set((state: any) => {
        const newState = { ...state };
        newState.declaration.appState.error = error?.response?.data;
        return newState;
      });
    }
  },
  shouldRedirectToAnotherStep: (): [boolean, number | null] => {
    const declaration = get().declaration.appState.declarationRequest;

    if (!declaration.age) {
      return [true, 1];
    }

    if (!declaration.meanOfTransport) {
      return [true, 2];
    }

    if (!declaration.country) {
      return [true, 3];
    }
    return [false, null];
  },
});
