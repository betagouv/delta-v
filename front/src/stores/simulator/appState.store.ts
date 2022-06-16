import { Alpha2Code } from 'i18n-iso-countries';

// eslint-disable-next-line import/no-cycle
import { StoreSlice } from '../store';
import { Product } from '@/model/product';

export enum MeansOfTransport {
  PLANE = 'plane',
  BOAT = 'boat',
  TRAIN = 'train',
  CAR = 'car',
  OTHER = 'other',
}

export interface ShoppingProduct {
  id: string;
  product: Product;
  amount: number;
  price: number;
}

export interface SimulatorAppStateSlice {
  simulator: {
    appState: {
      age?: number;
      meanOfTransport?: MeansOfTransport;
      country?: Alpha2Code;
      border?: boolean;
      shoppingProducts?: ShoppingProduct[];
    };
  };
}

export const SIMULATOR_EMPTY_STATE = {
  age: undefined,
  meanOfTransport: undefined,
  country: undefined,
  border: undefined,
  shoppingProducts: [],
};

export const createSimulatorAppStateSlice: StoreSlice<SimulatorAppStateSlice> = () => ({
  simulator: {
    appState: SIMULATOR_EMPTY_STATE,
  },
});
