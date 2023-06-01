/* eslint-disable import/no-cycle */
import { Alpha2Code } from 'i18n-iso-countries';

import { ShoppingProduct } from '../simulator/appState.store';
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
  meansOfTransportAndCountry: MeansOfTransportAndCountry;
  defaultCurrency?: string;
  shoppingProducts: ShoppingProduct[];
  validateProducts: ShoppingProduct[];
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

export interface MeansOfTransportAndCountry {
  meansOfTransport: MeansOfTransport;
  country: Alpha2Code;
  flightNumber?: string;
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
    meansOfTransportAndCountry: {
      meansOfTransport: MeansOfTransport.OTHER,
      country: 'FR' as Alpha2Code,
      flightNumber: undefined,
    },
    defaultCurrency: 'EUR',
    border: undefined,
    shoppingProducts: [],
    customShoppingProducts: [],
    validateProducts: [],
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
