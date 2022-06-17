import { Alpha2Code } from 'i18n-iso-countries';

// eslint-disable-next-line import/no-cycle
import { StoreSlice } from '../store';
// eslint-disable-next-line import/no-cycle
import { ShoppingProduct, SIMULATOR_EMPTY_STATE } from './appState.store';

export enum MeansOfTransport {
  PLANE = 'plane',
  BOAT = 'boat',
  TRAIN = 'train',
  CAR = 'car',
  OTHER = 'other',
}

export interface SimulatorUseCaseSlice {
  validateStep1: (age: number) => void;
  validateStep2: (meanOfTransport: MeansOfTransport) => void;
  validateStep3: (country: Alpha2Code) => void;
  validateStep4: (border: boolean) => void;
  resetSteps: (step: number) => void;
  addProduct: (shoppingProduct: ShoppingProduct) => void;
  removeProduct: (id: string) => void;
  updateProduct: (shoppingProduct: ShoppingProduct) => void;
  getNbProductsInCart: () => number;
}

export const createUseCaseSimulatorSlice: StoreSlice<SimulatorUseCaseSlice> = (set, get) => ({
  validateStep1: (age: number): void => {
    set((state: any) => {
      const newState = { ...state };
      newState.simulator.appState.age = age;
      return newState;
    });
  },
  validateStep2: (meanOfTransport: MeansOfTransport): void => {
    set((state: any) => {
      const newState = { ...state };
      newState.simulator.appState.meanOfTransport = meanOfTransport;
      return newState;
    });
  },
  validateStep3: (country: Alpha2Code): void => {
    set((state: any) => {
      const newState = { ...state };
      newState.simulator.appState.country = country;

      if (country !== 'CH' || state.simulator.appState.meanOfTransport !== MeansOfTransport.CAR) {
        newState.simulator.appState.border = false;
      }
      return newState;
    });
  },
  validateStep4: (border: boolean): void => {
    set((state: any) => {
      const newState = { ...state };
      newState.simulator.appState.border = border;
      return newState;
    });
  },
  resetSteps: (step: number): void => {
    set((state: any) => {
      const newState = { ...state };
      if (step <= 4) {
        newState.simulator.appState.border = SIMULATOR_EMPTY_STATE.border;
      }
      if (step <= 3) {
        newState.simulator.appState.country = SIMULATOR_EMPTY_STATE.country;
      }
      if (step <= 2) {
        newState.simulator.appState.meanOfTransport = SIMULATOR_EMPTY_STATE.meanOfTransport;
      }
      if (step <= 1) {
        newState.simulator.appState.age = SIMULATOR_EMPTY_STATE.age;
      }
      return newState;
    });
  },
  addProduct: (shoppingProduct: ShoppingProduct): void => {
    set((state: any) => {
      const newState = { ...state };
      newState.simulator.appState.shoppingProducts.push(shoppingProduct);
      return newState;
    });
  },
  removeProduct: (id: string): void => {
    set((state: any) => {
      const newState = { ...state };
      const newShoppingProducts = newState.simulator.appState.shoppingProducts.filter(
        (product: ShoppingProduct) => product.id !== id,
      );
      newState.simulator.appState.shoppingProducts = newShoppingProducts;
      return newState;
    });
  },
  updateProduct: (shoppingProduct: ShoppingProduct): void => {
    set((state: any) => {
      const newState = { ...state };
      const newShoppingProducts = newState.simulator.appState.shoppingProducts.filter(
        (product: ShoppingProduct) => product.id !== shoppingProduct.id,
      );
      newState.simulator.appState.shoppingProducts = newShoppingProducts;
      newState.simulator.appState.shoppingProducts.push(shoppingProduct);
      return newState;
    });
  },
  getNbProductsInCart: (): number => {
    return get().simulator?.appState?.shoppingProducts?.length ?? 0;
  },
});
