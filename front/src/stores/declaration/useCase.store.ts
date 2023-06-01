/* eslint-disable import/no-cycle */
import { countries } from 'countries-list';

import { ShoppingProduct } from '../simulator/appState.store';
import { StoreSlice } from '../store';
import {
  MeansOfTransport,
  DeclarationResponse,
  DECLARATION_EMPTY_STATE,
  ContactDetails,
  MeansOfTransportAndCountry,
} from './appState.store';
import axios from '@/config/axios';
import { Currencies } from '@/model/currencies';

export interface DeclarationUseCaseSlice {
  validateDeclarationStep1: (contactDetails: ContactDetails) => void;
  validateDeclarationStep2: (meansOfTransportAndCountry: MeansOfTransportAndCountry) => void;
  validateDeclarationStep3: (products: ShoppingProduct[]) => void;
  resetDeclarationSteps: (step: number) => void;
  addProductCartDeclaration: (shoppingProduct: ShoppingProduct) => void;
  getAllShoppingProduct: () => ShoppingProduct[];
  removeProductCartDeclaration: (id: string) => void;
  declarate: () => void;
}

export const createUseCaseDeclarationSlice: StoreSlice<DeclarationUseCaseSlice> = (set, get) => ({
  validateDeclarationStep1: (contactDetails: ContactDetails): void => {
    set((state: any) => {
      const newState = { ...state };
      newState.declaration.appState.declarationRequest.contactDetails = {
        ...contactDetails,
      };
      return newState;
    });
  },
  validateDeclarationStep2: (meansOfTransportAndCountry: MeansOfTransportAndCountry): void => {
    set((state: any) => {
      const newState = { ...state };
      newState.declaration.appState.declarationRequest.meansOfTransportAndCountry = {
        ...meansOfTransportAndCountry,
      };

      const rawCurrencies = countries[meansOfTransportAndCountry.country ?? 'FR'].currency;
      const mainCurrency = rawCurrencies.split(',')[0];
      const defaultCurrency = newState.currencies.appState.currencies.find(
        (currency: Currencies) => currency.id === mainCurrency,
      );

      newState.declaration.appState.declarationRequest.defaultCurrency =
        defaultCurrency?.id ?? 'EUR';

      if (
        meansOfTransportAndCountry.country !== 'CH' ||
        state.declaration.appState.declarationRequest.meanOfTransport !== MeansOfTransport.CAR
      ) {
        newState.declaration.appState.declarationRequest.border = false;
      }
      return newState;
    });
  },
  validateDeclarationStep3: (products: ShoppingProduct[]): void => {
    set((state: any) => {
      const newState = { ...state };
      newState.declaration.appState.declarationRequest.validateProducts = products;
      return newState;
    });
  },
  resetDeclarationSteps: (step: number): void => {
    set((state: any) => {
      const newState = { ...state };
      if (step <= 2) {
        newState.declaration.appState.declarationRequest.meanOfTransport =
          DECLARATION_EMPTY_STATE.declarationRequest.meansOfTransportAndCountry;
      }
      if (step <= 1) {
        newState.declaration.appState.declarationRequest.contactDetails =
          DECLARATION_EMPTY_STATE.declarationRequest.contactDetails;
      }
      newState.declaration.appState.declarationRequest.validateProducts =
        DECLARATION_EMPTY_STATE.declarationRequest.validateProducts;

      newState.declaration.appState.declarationResponse =
        DECLARATION_EMPTY_STATE.declarationResponse;
      return newState;
    });
  },
  declarate: async () => {
    try {
      const declarationData = get().declaration.appState;
      const data = {
        age: declarationData.declarationRequest.contactDetails,
        meanOfTransport: declarationData.declarationRequest.meansOfTransportAndCountry,
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
  addProductCartDeclaration: (shoppingProduct: ShoppingProduct): void => {
    set((state: any) => {
      const newState = { ...state };
      newState.declaration.appState.declarationRequest.shoppingProducts.push(shoppingProduct);
      return newState;
    });
    get().declarate();
  },
  getAllShoppingProduct: (): ShoppingProduct[] => {
    return get().declaration.appState.declarationRequest.shoppingProducts;
  },
  removeProductCartDeclaration: (id: string): void => {
    set((state: any) => {
      const newState = { ...state };
      const newShoppingProducts =
        newState.declaration.appState.declarationRequest.shoppingProducts.filter(
          (product: ShoppingProduct) => product.id !== id,
        );
      newState.declaration.appState.declarationRequest.shoppingProducts = newShoppingProducts;
      return newState;
    });
    get().declarate();
  },
});
