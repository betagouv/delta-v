import { Alpha2Code } from 'i18n-iso-countries';

// eslint-disable-next-line import/no-cycle
import { StoreSlice } from '../store';
// eslint-disable-next-line import/no-cycle
import {
  MeansOfTransport,
  ShoppingProduct,
  SimulatorResponse,
  SIMULATOR_EMPTY_STATE,
} from './appState.store';
import axios from '@/config/axios';

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
  updateShoppingProduct: ({ id, name, value }: UpdateShoppingProductOptions): void => {
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
      });

      return newState;
    });
    get().simulate();
  },
  simulate: async () => {
    try {
      const simulatorData = get().simulator.appState;
      const data = {
        age: simulatorData.simulatorRequest.age,
        meanOfTransport: simulatorData.simulatorRequest.meanOfTransport,
        country: simulatorData.simulatorRequest.country,
        border: simulatorData.simulatorRequest.border,
        shoppingProducts: simulatorData.simulatorRequest.shoppingProducts
          .filter((shoppingProduct) => shoppingProduct.product)
          .map((product: ShoppingProduct) => ({
            id: product.product?.id,
            customName: product.name,
            customId: product.id,
            value: product.value,
          })),
      };
      const response = (await axios.post('/api/simulator', data)).data as SimulatorResponse;
      set((state: any) => {
        const newState = { ...state };
        newState.simulator.appState.simulatorResponse = response;
        return newState;
      });
    } catch (error: any) {
      set((state: any) => {
        const newState = { ...state };
        newState.simulator.appState.error = error?.response?.data;
        return newState;
      });
    }
  },
});
