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
  product?: Product;
  name: string;
  amount: number;
  value: number;
}

export interface DetailedProduct {
  id: string;
  name: string;
  customName?: string;
  unitPrice: number;
  unitCustomDuty: number;
  unitVat: number;
  unitTaxes: number;
  customDuty: number;
  vat: number;
}

export interface BasketProduct {
  shoppingProduct: ShoppingProduct;
  detailedProduct?: DetailedProduct;
}

export interface SimulatorResponse {
  valueProducts?: DetailedProduct[];
  total: number;
  totalCustomDuty: number;
  totalVat: number;
  totalTaxes: number;
  franchiseAmount: number;
}

export interface SimulatorRequest {
  age?: number;
  meanOfTransport?: MeansOfTransport;
  country?: Alpha2Code;
  border?: boolean;
  shoppingProducts: ShoppingProduct[];
}

export interface SimulatorData {
  simulatorRequest: SimulatorRequest;
  simulatorResponse?: SimulatorResponse;
  displayInfo: boolean;
  error?: any;
}

export interface SimulatorAppStateSlice {
  simulator: {
    appState: SimulatorData;
  };
}

export const SIMULATOR_EMPTY_STATE = {
  simulatorRequest: {
    age: undefined,
    meanOfTransport: undefined,
    country: undefined,
    border: undefined,
    shoppingProducts: [],
  },
  simulatorResponse: undefined,
  displayInfo: true,
  error: undefined,
};

export const createSimulatorAppStateSlice: StoreSlice<SimulatorAppStateSlice> = () => ({
  simulator: {
    appState: SIMULATOR_EMPTY_STATE,
  },
});
