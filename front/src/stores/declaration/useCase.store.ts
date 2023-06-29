/* eslint-disable import/no-cycle */
import axios from 'axios';
import { countries } from 'countries-list';
import { v4 as uuidv4 } from 'uuid';

import { ShoppingProduct, SimulatorResponse } from '../simulator/appState.store';
import { StoreSlice } from '../store';
import {
  ContactDetails,
  MeansOfTransportAndCountry,
  DECLARATION_EMPTY_STATE,
} from './appState.store';
import { Currencies } from '@/model/currencies';

export interface DeclarationUseCaseSlice {
  validateDeclarationStep1: (contactDetails: ContactDetails) => void;
  validateDeclarationStep2: (meansOfTransportAndCountry: MeansOfTransportAndCountry) => void;
  addProductCartDeclaration: (product: ShoppingProduct) => void;
  updateProductCartDeclaration: (product: Partial<ShoppingProduct>) => void;
  removeProductCartDeclaration: (id: string) => void;
  findDeclarationShoppingProduct: (id: string) => ShoppingProduct | undefined;
  checkProductCartDeclaration: () => void;
  declare: () => void;
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
  addProductCartDeclaration: (shoppingProduct: ShoppingProduct): void => {
    set((state: any) => {
      const newState = { ...state };
      newState.declaration.appState.declarationRequest.shoppingProducts.push(shoppingProduct);
      return newState;
    });
    get().declare();
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
