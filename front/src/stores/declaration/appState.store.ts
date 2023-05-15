import { Alpha2Code } from 'i18n-iso-countries';

// eslint-disable-next-line import/no-cycle
import { StoreSlice } from '../store';

export enum MeansOfTransport {
  PLANE = 'plane',
  BOAT = 'boat',
  TRAIN = 'train',
  CAR = 'car',
  OTHER = 'other',
}

export interface DeclarationResponse {
  total: number;
  totalCustomDuty: number;
  totalVat: number;
  totalTaxes: number;
  franchiseAmount: number;
}

export interface DeclarationRequest {
  contactDetails: ContactDetails;
  meanOfTransport?: string;
  country?: Alpha2Code;
  defaultCurrency?: string;
  border?: boolean;
}

export interface ContactDetails {
  age: number;
  lastName: string;
  firstName: string;
  address: string;
  city: string;
  postalCode: string;
  email: string;
  phoneNumber: string;
}

export interface DeclarationData {
  declarationRequest: DeclarationRequest;
  declarationResponse?: DeclarationResponse;
  displayInfo: boolean;
  error?: any;
}

export interface DeclarationAppStateSlice {
  declaration: {
    appState: DeclarationData;
  };
}

export const DECLARATION_EMPTY_STATE = {
  declarationRequest: {
    contactDetails: {
      age: 0,
      lastName: '',
      firstName: '',
      address: '',
      city: '',
      postalCode: '',
      email: '',
      phoneNumber: '',
    },
    meanOfTransport: undefined,
    country: undefined,
    defaultCurrency: 'EUR',
    border: undefined,
    shoppingProducts: [],
    customShoppingProducts: [],
  },
  declarationResponse: undefined,
  displayInfo: true,
  error: undefined,
};

export const createDeclarationAppStateSlice: StoreSlice<DeclarationAppStateSlice> = () => ({
  declaration: {
    appState: DECLARATION_EMPTY_STATE,
  },
});
