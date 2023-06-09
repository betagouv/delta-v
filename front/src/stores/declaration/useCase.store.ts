/* eslint-disable import/no-cycle */
import { countries } from 'countries-list';

import { ShoppingProduct, SimulatorResponse } from '../simulator/appState.store';
import { StoreSlice } from '../store';
import {
  MeansOfTransport,
  DECLARATION_EMPTY_STATE,
  ContactDetails,
  MeansOfTransportAndCountry,
  ValidateStep3Options,
  DeclarationResponse,
} from './appState.store';
import axios from '@/config/axios';
import { Currencies } from '@/model/currencies';

export interface DeclarationUseCaseSlice {
  validateDeclarationStep1: (contactDetails: ContactDetails) => void;
  validateDeclarationStep2: (meansOfTransportAndCountry: MeansOfTransportAndCountry) => void;
  validateDeclarationStep3: ({ shoppingProducts, declarationId }: ValidateStep3Options) => void;
  resetDeclarationSteps: (step: number) => void;
  addProductCartDeclaration: (product: ShoppingProduct) => void;
  getAllShoppingProduct: () => ShoppingProduct[];
  removeProductCartDeclaration: (id: string) => void;
  declare: () => void;
  validateDeclaration: (declarationId: string) => void;
  getDeclaration: (declarationId: string) => void;
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
  },
  validateDeclarationStep3: ({ shoppingProducts, declarationId }: ValidateStep3Options): void => {
    set((state: any) => {
      const newState = { ...state };
      newState.declaration.appState.declarationRequest.validateProducts = shoppingProducts;
      return newState;
    });
    get().validateDeclaration(declarationId);
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
      const response = (await axios.post('/api/simulator', data)).data as SimulatorResponse;
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
  validateDeclaration: async (declarationId: string) => {
    try {
      const declarationData = get().declaration.appState;
      const data = {
        shoppingProducts: declarationData.declarationRequest.validateProducts.map(
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
        authorEmail: declarationData.declarationRequest.contactDetails.email,
        authorId: 'fc3aed41-e6f2-4937-aa09-7113c1641014',
        authorFullName: `${declarationData.declarationRequest.contactDetails.firstName} ${declarationData.declarationRequest.contactDetails.lastName}`,
        authorType: 'agent',
        declarantAddressStreet: declarationData.declarationRequest.contactDetails.address,
        declarantAddressCity: declarationData.declarationRequest.contactDetails.city,
        declarantAddressPostalCode: declarationData.declarationRequest.contactDetails.postalCode,
        declarantPhoneNumber: declarationData.declarationRequest.contactDetails.phoneNumber,
        declarantEmail: declarationData.declarationRequest.contactDetails.email,
        declarantFirstName: declarationData.declarationRequest.contactDetails.firstName,
        declarantLastName: declarationData.declarationRequest.contactDetails.lastName,
      };
      const response = (await axios.put(`/api/declaration/${declarationId}`, data))
        .data as DeclarationResponse;
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
  addProductCartDeclaration: (shoppingProduct: ShoppingProduct): void => {
    set((state: any) => {
      const newState = { ...state };
      newState.declaration.appState.declarationRequest.shoppingProducts.push(shoppingProduct);
      return newState;
    });
    get().declare();
  },
  getAllShoppingProduct: (): ShoppingProduct[] => {
    return get().declaration.appState.declarationRequest.shoppingProducts;
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
      const newShoppingProducts =
        newState.declaration.appState.declarationRequest.shoppingProducts.filter(
          (product: ShoppingProduct) => product.id !== id,
        );
      newState.declaration.appState.declarationRequest.shoppingProducts = newShoppingProducts;
      return newState;
    });
    get().declare();
  },
});
