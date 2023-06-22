/* eslint-disable import/no-cycle */
import axios from 'axios';
import { countries } from 'countries-list';
import { v4 as uuidv4 } from 'uuid';

import { ShoppingProduct, SimulatorResponse } from '../simulator/appState.store';
import { StoreSlice } from '../store';
import {
  MeansOfTransport,
  ContactDetails,
  MeansOfTransportAndCountry,
  DeclarationResponse,
  DECLARATION_EMPTY_STATE,
} from './appState.store';
import { Currencies } from '@/model/currencies';

export interface DeclarationUseCaseSlice {
  validateDeclarationStep1: (contactDetails: ContactDetails) => void;
  validateDeclarationStep2: (meansOfTransportAndCountry: MeansOfTransportAndCountry) => void;
  addProductCartDeclaration: (product: ShoppingProduct) => void;
  addDeclarationsLoaded: (declarations: DeclarationResponse[]) => void;
  removeProductCartDeclaration: (id: string) => void;
  checkProductCartDeclaration: () => void;
  declare: () => void;
  getDeclaration: (declarationId: string) => void;
  resetDeclaration: () => void;
}

export const createUseCaseDeclarationSlice: StoreSlice<DeclarationUseCaseSlice> = (set, get) => ({
  validateDeclarationStep1: (contactDetails: ContactDetails): void => {
    set((state: any) => {
      const newState = { ...state };
      newState.declaration.appState.declarationRequest.contactDetails = {
        ...contactDetails,
      };
      newState.declaration.appState.declarationRequest.declarationId = uuidv4();
      return newState;
    });
    get().checkProductCartDeclaration();
  },
  validateDeclarationStep2: (meansOfTransportAndCountry: MeansOfTransportAndCountry): void => {
    set((state: any) => {
      const newState = { ...state };
      newState.declaration.appState.declarationRequest.meansOfTransportAndCountry = {
        ...meansOfTransportAndCountry,
      };

      const rawCurrencies = countries[meansOfTransportAndCountry.country ?? 'FR'].currency;
      const defaultCurrency = newState.currencies.appState.currencies.find((currency: Currencies) =>
        rawCurrencies?.includes(currency.id),
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
    get().checkProductCartDeclaration();
  },
  declare: async () => {
    try {
      const declarationData = get().declaration.appState;
      const data = {
        shoppingProducts: declarationData.declarationRequest.shoppingProducts.map(
          (shoppingProduct: ShoppingProduct) => ({
            id: shoppingProduct.productId,
            customName: shoppingProduct.name,
            customId: shoppingProduct.id,
            originalValue: shoppingProduct.value,
            currency: shoppingProduct.currency,
          }),
        ),
        border: declarationData.declarationRequest.border,
        age: declarationData.declarationRequest.contactDetails.age,
        country: declarationData.declarationRequest.meansOfTransportAndCountry.country,
        meanOfTransport:
          declarationData.declarationRequest.meansOfTransportAndCountry.meansOfTransport,
      };
      const response = (await axios.post('/simulator', data)).data as SimulatorResponse;
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
    get().declare();
  },
  addDeclarationsLoaded: (declarationsLoaded: DeclarationResponse[]): void => {
    set((state: any) => {
      const newState = { ...state };
      if (newState.declaration.appState.allDeclarations) {
        newState.declaration.appState.allDeclarations.push(declarationsLoaded);
      } else {
        newState.declaration.appState.allDeclarations = declarationsLoaded;
      }
      return newState;
    });
  },
  getDeclaration: async (declarationId: string) => {
    try {
      const response = (await axios.get(`/api/declaration/${declarationId}`)).data
        .declaration as DeclarationResponse;
      set((state: any) => {
        const newState = { ...state };
        newState.declaration.appState.validateDeclarationResponse = response;
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
  removeProductCartDeclaration: (id: string): void => {
    set((state: any) => {
      const newState = { ...state };

      const newProducts = newState.declaration.appState.declarationRequest.shoppingProducts.filter(
        (product: ShoppingProduct) => product.id !== id,
      );
      newState.declaration.appState.declarationRequest.shoppingProducts = newProducts;
      return newState;
    });
    get().declare();
  },
  checkProductCartDeclaration: (): void => {
    set((state: any) => {
      const newState = { ...state };
      const { shoppingProducts } = newState.declaration.appState.declarationRequest;
      const shoppingProductsToKeep: ShoppingProduct[] = [];
      shoppingProducts.forEach((product: ShoppingProduct) => {
        if (newState.findProduct(product.productId)) {
          shoppingProductsToKeep.push(product);
        }
      });
      newState.declaration.appState.declarationRequest.shoppingProducts = shoppingProductsToKeep;
      return newState;
    });
  },
  resetDeclaration: () => {
    set((state: any) => {
      const newState = { ...state };
      newState.declaration.appState = { ...DECLARATION_EMPTY_STATE };
      return newState;
    });
  },
});
