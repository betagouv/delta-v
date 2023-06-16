import { Alpha2Code } from 'i18n-iso-countries';

// eslint-disable-next-line import/no-cycle
import { StoreSlice } from '../store';
import { AmountProduct } from '@/model/product';

export enum MeansOfTransport {
  PLANE = 'plane',
  BOAT = 'boat',
  TRAIN = 'train',
  CAR = 'car',
  OTHER = 'other',
}

export interface ShoppingProduct {
  id: string;
  productId?: string;
  productName?: string;
  name: string;
  amount: number;
  value: number;
  currency: string;
}

export interface DetailedProduct {
  id: string;
  name: string;
  customId: string;
  customName?: string;
  unitPrice: number;
  originalPrice: number;
  originalCurrency: string;
  rateCurrency: number;
  unitCustomDuty: number;
  unitVat: number;
  unitTaxes: number;
  customDuty: number;
  vat: number;
}

export interface GroupedAmountProduct {
  group: string;
  products: {
    id: string;
    name: string;
    amountProduct: AmountProduct;
    customName?: string;
    customId: string;
    amount: number;
  }[];
  isOverMaximum: boolean;
}

export interface SimulatorResponse {
  valueProducts?: DetailedProduct[];
  customProducts?: DetailedProduct[];
  amountProducts?: GroupedAmountProduct[];
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
  defaultCurrency?: string;
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
    defaultCurrency: 'EUR',
    border: undefined,
    shoppingProducts: [],
    customShoppingProducts: [],
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
