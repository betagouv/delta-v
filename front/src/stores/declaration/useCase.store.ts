/* eslint-disable import/no-cycle */
import axios from 'axios';
import clone from 'clone';
import { countries } from 'countries-list';
import { v4 as uuidv4 } from 'uuid';

import {
  SIMULATOR_EMPTY_STATE,
  ShoppingProduct,
  SimulatorResponse,
} from '../simulator/appState.store';
import { StoreSlice } from '../store';
import {
  ContactDetails,
  MeansOfTransportAndCountry,
  DECLARATION_EMPTY_STATE,
} from './appState.store';
import { Currencies } from '@/model/currencies';

export interface DeclarationUseCaseSlice {
  validateDeclarationAgentStep1: (contactDetails: ContactDetails) => void;
  validateDeclarationAgentStep2: (meansOfTransportAndCountry: MeansOfTransportAndCountry) => void;
  validateDeclarationStep1: (age: number) => void;
  validateDeclarationStep2: (contactDetails: ContactDetails) => void;
  validateDeclarationStep3: (meansOfTransportAndCountry: MeansOfTransportAndCountry) => void;
  addProductCartDeclaration: (product: ShoppingProduct) => void;
  addProductCartDeclarationAgent: (product: ShoppingProduct) => void;
  updateProductCartDeclaration: (product: Partial<ShoppingProduct>) => void;
  removeProductCartDeclaration: (id: string) => void;
  updateProductCartDeclarationAgent: (product: Partial<ShoppingProduct>) => void;
  removeProductCartDeclarationAgent: (id: string) => void;
  findDeclarationShoppingProduct: (id: string) => ShoppingProduct | undefined;
  findDeclarationShoppingProductAgent: (id: string) => ShoppingProduct | undefined;
  checkProductCartDeclaration: () => void;
  declare: () => void;
  declareAgent: () => void;
  resetDeclaration: () => void;
  resetDeclarationAgent: () => void;
  resetAllRequests: () => void;
}

export const createUseCaseDeclarationSlice: StoreSlice<DeclarationUseCaseSlice> = (set, get) => ({
  validateDeclarationAgentStep1: (contactDetails: ContactDetails): void => {
    set((state: any) => {
      const newState = { ...state };
      newState.declaration.appState.declarationAgentRequest.contactDetails = {
        ...contactDetails,
      };
      newState.declaration.appState.declarationAgentRequest.declarationId = uuidv4();
      return newState;
    });
    get().checkProductCartDeclaration();
  },
  validateDeclarationAgentStep2: (meansOfTransportAndCountry: MeansOfTransportAndCountry): void => {
    set((state: any) => {
      const newState = { ...state };
      newState.declaration.appState.declarationAgentRequest.meansOfTransportAndCountry = {
        ...meansOfTransportAndCountry,
      };

      const rawCurrencies = countries[meansOfTransportAndCountry.country ?? 'FR'].currency;
      const defaultCurrency = newState.currencies.appState.currencies.find((currency: Currencies) =>
        rawCurrencies?.includes(currency.id),
      );

      newState.declaration.appState.declarationAgentRequest.defaultCurrency =
        defaultCurrency?.id ?? 'EUR';

      newState.declaration.appState.declarationAgentRequest.border =
        meansOfTransportAndCountry.border;
      return newState;
    });
    get().checkProductCartDeclaration();
  },
  validateDeclarationStep1: (age: number): void => {
    set((state: any) => {
      const newState = { ...state };
      newState.declaration.appState.declarationRequest.contactDetails.age = age;
      newState.declaration.appState.declarationRequest.declarationId = uuidv4();
      return newState;
    });
    get().checkProductCartDeclaration();
  },
  validateDeclarationStep2: (contactDetails: ContactDetails): void => {
    set((state: any) => {
      const newState = { ...state };
      newState.declaration.appState.declarationRequest.contactDetails = {
        ...contactDetails,
        age: newState.declaration.appState.declarationRequest.contactDetails.age,
      };
      return newState;
    });
    get().checkProductCartDeclaration();
  },
  validateDeclarationStep3: (meansOfTransportAndCountry: MeansOfTransportAndCountry): void => {
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

      newState.declaration.appState.declarationRequest.border = meansOfTransportAndCountry.border;
      return newState;
    });
    get().checkProductCartDeclaration();
  },
  findDeclarationShoppingProduct: (id: string): ShoppingProduct | undefined => {
    return (
      get().declaration?.appState?.declarationRequest.shoppingProducts?.find(
        (product: ShoppingProduct) => product.id === id,
      ) ?? undefined
    );
  },
  findDeclarationShoppingProductAgent: (id: string): ShoppingProduct | undefined => {
    return (
      get().declaration?.appState?.declarationAgentRequest.shoppingProducts?.find(
        (product: ShoppingProduct) => product.id === id,
      ) ?? undefined
    );
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
        border: declarationData.declarationRequest.border ?? false,
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
  declareAgent: async () => {
    try {
      const declarationData = get().declaration.appState;
      const data = {
        shoppingProducts: declarationData.declarationAgentRequest.shoppingProducts.map(
          (shoppingProduct: ShoppingProduct) => ({
            id: shoppingProduct.productId,
            customName: shoppingProduct.name,
            customId: shoppingProduct.id,
            originalValue: shoppingProduct.value,
            currency: shoppingProduct.currency,
          }),
        ),
        border: declarationData.declarationAgentRequest.border ?? false,
        age: declarationData.declarationAgentRequest.contactDetails.age,
        country: declarationData.declarationAgentRequest.meansOfTransportAndCountry.country,
        meanOfTransport:
          declarationData.declarationAgentRequest.meansOfTransportAndCountry.meansOfTransport,
      };
      const response = (await axios.post('/simulator', data)).data as SimulatorResponse;
      set((state: any) => {
        const newState = { ...state };
        newState.declaration.appState.declarationAgentResponse = response;
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
  addProductCartDeclarationAgent: (shoppingProduct: ShoppingProduct): void => {
    set((state: any) => {
      const newState = { ...state };
      newState.declaration.appState.declarationAgentRequest.shoppingProducts.push(shoppingProduct);
      return newState;
    });
    get().declareAgent();
  },
  updateProductCartDeclaration: ({ id, name, value, currency }: Partial<ShoppingProduct>): void => {
    set((state: any) => {
      const newState = { ...state };

      const currentShoppingProduct =
        newState.declaration.appState.declarationRequest.shoppingProducts.find(
          (product: ShoppingProduct) => product.id === id,
        );
      const newShoppingProducts =
        newState.declaration.appState.declarationRequest.shoppingProducts.filter(
          (product: ShoppingProduct) => product.id !== id,
        );
      newState.declaration.appState.declarationRequest.shoppingProducts = newShoppingProducts;
      newState.declaration.appState.declarationRequest.shoppingProducts.push({
        ...currentShoppingProduct,
        name,
        value,
        currency,
      });

      return newState;
    });
    get().declare();
  },
  removeProductCartDeclaration: (id: string): void => {
    set((state: any) => {
      const newState = { ...state };

      const newProducts = newState.declaration.appState.declarationRequest.shoppingProducts.filter(
        (product: ShoppingProduct) => product.id !== id,
      );
      newState.declaration.appState.declarationRequest.shoppingProducts = [...newProducts];
      return newState;
    });
    get().declare();
  },
  updateProductCartDeclarationAgent: ({
    id,
    name,
    value,
    currency,
  }: Partial<ShoppingProduct>): void => {
    set((state: any) => {
      const newState = { ...state };
      const currentShoppingProduct =
        newState.declaration.appState.declarationAgentRequest.shoppingProducts.find(
          (product: ShoppingProduct) => product.id === id,
        );
      console.log('🚀 ~ set ~ currentShoppingProduct:', currentShoppingProduct);
      const newShoppingProducts =
        newState.declaration.appState.declarationAgentRequest.shoppingProducts.filter(
          (product: ShoppingProduct) => product.id !== id,
        );
      newState.declaration.appState.declarationAgentRequest.shoppingProducts = newShoppingProducts;
      newState.declaration.appState.declarationAgentRequest.shoppingProducts.push({
        ...currentShoppingProduct,
        name,
        value,
        currency,
      });

      return newState;
    });
    get().declareAgent();
  },
  removeProductCartDeclarationAgent: (id: string): void => {
    set((state: any) => {
      const newState = { ...state };

      const newProducts =
        newState.declaration.appState.declarationAgentRequest.shoppingProducts.filter(
          (product: ShoppingProduct) => product.id !== id,
        );
      newState.declaration.appState.declarationAgentRequest.shoppingProducts = newProducts;
      return newState;
    });
    get().declareAgent();
  },
  checkProductCartDeclaration: (): void => {
    set((state: any) => {
      const newState = { ...state };
      const shoppingProducts: ShoppingProduct[] =
        newState.declaration.appState.declarationAgentRequest?.shoppingProducts ?? [];
      const shoppingProductsToKeep: ShoppingProduct[] = [];
      shoppingProducts.forEach((product: ShoppingProduct) => {
        if (newState.findProduct(product.productId)) {
          shoppingProductsToKeep.push(product);
        }
      });
      newState.declaration.appState.declarationAgentRequest.shoppingProducts =
        shoppingProductsToKeep;
      return newState;
    });
  },
  resetDeclaration: () => {
    set((state: any) => {
      const newState = { ...state };
      newState.declaration.appState.declarationRequest = clone(
        DECLARATION_EMPTY_STATE.declarationRequest,
      );
      newState.declaration.appState.declarationResponse = clone(
        DECLARATION_EMPTY_STATE.declarationResponse,
      );
      return newState;
    });
  },
  resetDeclarationAgent: () => {
    set((state: any) => {
      const newState = { ...state };
      newState.declaration.appState.declarationAgentRequest = clone(
        DECLARATION_EMPTY_STATE.declarationAgentRequest,
      );
      newState.declaration.appState.declarationAgentResponse = clone(
        DECLARATION_EMPTY_STATE.declarationAgentResponse,
      );
      return newState;
    });
  },
  resetAllRequests: () => {
    set((state: any) => {
      const newState = { ...state };
      newState.declaration.appState.declarationRequest = clone(
        DECLARATION_EMPTY_STATE.declarationRequest,
      );
      newState.declaration.appState.declarationResponse = clone(
        DECLARATION_EMPTY_STATE.declarationResponse,
      );
      newState.simulator.appState = clone(SIMULATOR_EMPTY_STATE);
      return newState;
    });
  },
});
