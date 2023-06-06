/* eslint-disable import/no-cycle */
import { Alpha2Code } from 'i18n-iso-countries';

import { DetailedProduct, ShoppingProduct, SimulatorResponse } from '../simulator/appState.store';
import { StoreSlice } from '../store';
import { DeclarationStatus } from '@/utils/declarationStatus.util';

export enum MeansOfTransport {
  PLANE = 'plane',
  BOAT = 'boat',
  TRAIN = 'train',
  CAR = 'car',
  OTHER = 'other',
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

export interface ValidateStep3Options {
  shoppingProducts: ShoppingProduct[];
  declarationId: string;
}

export interface DeclarationData {
  declarationRequest: DeclarationRequest;
  declarationResponse?: SimulatorResponse;
  validateDeclarationResponse?: DeclarationResponse;
  displayInfo: boolean;
  error?: any;
}

export interface DeclarationAppStateSlice {
  declaration: {
    appState: DeclarationData;
  };
}

export interface DeclarationResponse {
  authorEmail: string;
  authorFullName: string;
  authorId: string;
  declarantAddressStreet: string;
  declarantAddressCity: string;
  declarantAddressPostalCode: string;
  declarantPhoneNumber: string;
  declarantAge: number;
  declarantBorder: boolean;
  declarantCountry: Alpha2Code;
  declarantEmail: string;
  declarantFirstName: string;
  declarantLastName: string;
  declarantMeanOfTransport: MeansOfTransport;
  franchiseAmount: number;
  id: string;
  publicId: string;
  status: DeclarationStatus;
  totalAmount: number;
  totalCustomDutyAmount: number;
  totalTaxesAmount: number;
  totalVatAmount: number;
  versionDate: Date;
  products: DetailedProduct[];
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
  validateDeclarationResponse: undefined,
  displayInfo: true,
  error: undefined,
};

export const createDeclarationAppStateSlice: StoreSlice<DeclarationAppStateSlice> = () => ({
  declaration: {
    appState: DECLARATION_EMPTY_STATE,
  },
});
