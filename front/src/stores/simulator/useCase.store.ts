import { countries } from 'countries-list';
import type { Alpha2Code } from 'i18n-iso-countries';
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line import/no-cycle
import { StoreSlice } from '../store';
// eslint-disable-next-line import/no-cycle
import { MeansOfTransport, ShoppingProduct, SIMULATOR_EMPTY_STATE } from './appState.store';
import { checkSimulatorDataRequest, simulateRequest } from '@/api/lib/declaration';
import { Currencies } from '@/model/currencies';
import { isAxiosError, isError } from '@/utils/error';

export interface SimulatorUseCaseSlice {
  validateStep0: (displayInfo: boolean) => void;
  validateStep1: (age: number) => void;
  validateStep2: (meanOfTransport: MeansOfTransport) => void;
  validateStep3: (country: Alpha2Code) => void;
  validateStep4: (border: boolean) => void;
  isSimulatorAlreadyStarted: () => boolean;
  resetSteps: (step: number) => void;
  addProduct: (shoppingProduct: ShoppingProduct) => void;
  removeProduct: (id: string) => void;
  getNbProductsInCart: () => number;
  findShoppingProduct: (id: string) => ShoppingProduct | undefined;
  updateShoppingProduct: (options: UpdateShoppingProductOptions) => void;
  simulate: () => void;
}

interface UpdateShoppingProductOptions {
  id: string;
  name: string;
  value: number;
  currency: string;
}

export const createUseCaseSimulatorSlice: StoreSlice<SimulatorUseCaseSlice> = (set, get) => ({
  validateStep0: (displayInfo: boolean): void => {
    set((state: any) => {
      const newState = { ...state };
      newState.simulator.appState.displayInfo = displayInfo;
      return newState;
    });
  },
  validateStep1: (age: number): void => {
    set((state: any) => {
      const newState = { ...state };
      newState.simulator.appState.simulatorRequest.age = age;
      newState.simulator.appState.simulatorRequest.declarationId = uuidv4();
      return newState;
    });
  },
  validateStep2: (meanOfTransport: MeansOfTransport): void => {
    set((state: any) => {
      const newState = { ...state };
      newState.simulator.appState.simulatorRequest.meanOfTransport = meanOfTransport;
      return newState;
    });
  },
  validateStep3: (country: Alpha2Code): void => {
    set((state: any) => {
      const newState = { ...state };
      newState.simulator.appState.simulatorRequest.country = country;
      const rawCurrencies = countries[country ?? 'FR'].currency;
      const mainCurrency = rawCurrencies.split(',')[0];
      const defaultCurrency = newState.currencies.appState.currencies.find(
        (currency: Currencies) => currency.id === mainCurrency,
      );

      newState.simulator.appState.simulatorRequest.defaultCurrency = defaultCurrency?.id ?? 'EUR';

      if (
        country !== 'CH' ||
        state.simulator.appState.simulatorRequest.meanOfTransport !== MeansOfTransport.CAR
      ) {
        newState.simulator.appState.simulatorRequest.border = false;
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
  isSimulatorAlreadyStarted: (): boolean => {
    return get().simulator.appState.simulatorRequest.age !== undefined;
  },
  resetSteps: (step: number): void => {
    set((state: any) => {
      const newState = { ...state };
      if (step <= 4) {
        newState.simulator.appState.simulatorRequest.border =
          SIMULATOR_EMPTY_STATE.simulatorRequest.border;
      }
      if (step <= 3) {
        newState.simulator.appState.simulatorRequest.country =
          SIMULATOR_EMPTY_STATE.simulatorRequest.country;
        newState.simulator.appState.simulatorRequest.defaultCurrency =
          SIMULATOR_EMPTY_STATE.simulatorRequest.defaultCurrency;
      }
      if (step <= 2) {
        newState.simulator.appState.simulatorRequest.meanOfTransport =
          SIMULATOR_EMPTY_STATE.simulatorRequest.meanOfTransport;
      }
      if (step <= 1) {
        newState.simulator.appState.simulatorRequest.age =
          SIMULATOR_EMPTY_STATE.simulatorRequest.age;
      }
      newState.simulator.appState.simulatorRequest.shoppingProducts =
        SIMULATOR_EMPTY_STATE.simulatorRequest.shoppingProducts;
      newState.simulator.appState.simulatorResponse = SIMULATOR_EMPTY_STATE.simulatorResponse;
      return newState;
    });
  },
  addProduct: (shoppingProduct: ShoppingProduct): void => {
    set((state: any) => {
      const newState = { ...state };
      newState.simulator.appState.simulatorRequest.shoppingProducts.push(shoppingProduct);
      return newState;
    });
    get().simulate();
  },
  removeProduct: (id: string): void => {
    set((state: any) => {
      const newState = { ...state };
      const newShoppingProducts =
        newState.simulator.appState.simulatorRequest.shoppingProducts.filter(
          (product: ShoppingProduct) => product.id !== id,
        );
      newState.simulator.appState.simulatorRequest.shoppingProducts = newShoppingProducts;
      return newState;
    });
    get().simulate();
  },
  getNbProductsInCart: (): number => {
    return get().simulator?.appState?.simulatorRequest.shoppingProducts?.length ?? 0;
  },
  findShoppingProduct: (id: string): ShoppingProduct | undefined => {
    return (
      get().simulator?.appState?.simulatorRequest.shoppingProducts?.find(
        (product: ShoppingProduct) => product.id === id,
      ) ?? undefined
    );
  },
  updateShoppingProduct: ({ id, name, value, currency }: UpdateShoppingProductOptions): void => {
    set((state: any) => {
      const newState = { ...state };
      const currentShoppingProduct =
        newState.simulator.appState.simulatorRequest.shoppingProducts.find(
          (product: ShoppingProduct) => product.id === id,
        );
      const newShoppingProducts =
        newState.simulator.appState.simulatorRequest.shoppingProducts.filter(
          (product: ShoppingProduct) => product.id !== id,
        );
      newState.simulator.appState.simulatorRequest.shoppingProducts = newShoppingProducts;
      newState.simulator.appState.simulatorRequest.shoppingProducts.push({
        ...currentShoppingProduct,
        name,
        value,
        currency,
      });

      return newState;
    });
    get().simulate();
  },
  simulate: async () => {
    try {
      const simulatorData = get().simulator.appState;
      const simulateRequestData = checkSimulatorDataRequest(simulatorData.simulatorRequest);
      const response = await simulateRequest(simulateRequestData);
      set((state: any) => {
        const newState = { ...state };
        newState.simulator.appState.simulatorResponse = response;
        return newState;
      });
    } catch (error) {
      let dataError: any;
      if (isAxiosError<any>(error)) {
        dataError = error.response?.data;
      } else if (isError(error)) {
        dataError = error.message;
      } else {
        dataError = 'unknown error';
      }
      set((state: any) => {
        const newState = { ...state };
        newState.simulator.appState.error = dataError;
        return newState;
      });
    }
  },
});
