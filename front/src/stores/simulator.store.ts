import { Alpha2Code } from 'i18n-iso-countries';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface SimulateParams {
  border?: boolean;
  age?: number;
  meanOfTransport?: string;
  country?: Alpha2Code;
  shopingProducts?: ShopingProduct[];
}

interface ShopingProduct {
  id: string;
  amount: number;
  price: number;
}

export enum SimulateSteps {
  AGE = 'age',
  MEAN_OF_TRANSPORT = 'moyen-de-transport',
  COUNTRY = 'pays',
  BORDER = 'frontalier',
  SHOPPING_PRODUCTS = 'produits',
}

const getAllParams = (newData: SimulateParams, currentData: SimulateParams): SimulateParams => {
  return {
    age: newData.age ?? currentData.age,
    border: newData.border ?? currentData.border,
    meanOfTransport: newData.meanOfTransport ?? currentData.meanOfTransport,
    country: newData.country ?? currentData.country,
    shopingProducts: newData.shopingProducts ?? currentData.shopingProducts,
  };
};

const getCurrentStep = (currentData: SimulateParams): SimulateSteps => {
  if (!currentData.age) {
    return SimulateSteps.AGE;
  }
  if (!currentData.meanOfTransport) {
    return SimulateSteps.MEAN_OF_TRANSPORT;
  }
  if (!currentData.country) {
    return SimulateSteps.COUNTRY;
  }
  if (
    currentData.meanOfTransport === 'car' &&
    currentData.country === 'CH' &&
    currentData.border === undefined
  ) {
    return SimulateSteps.BORDER;
  }
  return SimulateSteps.SHOPPING_PRODUCTS;
};

export interface SimulatorStoreInterface {
  simulateParams: SimulateParams;
  simulateStep: SimulateSteps;
  setSimulateParams: (data: SimulateParams) => void;
  resetParams: () => void;
}

export const useSimulatorStore = create<SimulatorStoreInterface>(
  persist(
    (set: any, get: any) => ({
      simulateParams: {},
      simulateStep: SimulateSteps.AGE,
      setSimulateParams: (data: SimulateParams) => {
        set({ simulateParams: getAllParams(data, get().simulateParams) });
        set({ simulateStep: getCurrentStep(get().simulateParams) });
      },
      resetParams: () => {
        set({ simulateParams: {} });
        set({ simulateStep: SimulateSteps.AGE });
      },
    }),
    {
      name: 'simulator-storage',
    },
  ),
);
