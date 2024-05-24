/* eslint-disable import/no-cycle */
import clone from 'clone';
import type { Alpha2Code } from 'i18n-iso-countries';

import { DetailedProduct, ShoppingProduct, SimulatorResponse } from '../simulator/appState.store';
import { StoreSlice } from '../store';
import { Product } from '@/model/product';
import { DeclarationStatus } from '@/utils/declarationStatus.util';

export enum MeansOfTransport {
  PLANE = 'plane',
  BOAT = 'boat',
  TRAIN = 'train',
  CAR = 'car',
  OTHER = 'other',
}

export interface DeclarationRequest {
  declarationId?: string;
  contactDetails: ContactDetails;
  meansOfTransportAndCountry: MeansOfTransportAndCountry;
  defaultCurrency?: string;
  shoppingProducts: ShoppingProduct[];
  products: Product[];
  border?: boolean;
}

export interface ContactDetails {
  age?: number;
  lastName?: string;
  firstName?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  email?: string;
  phoneNumber?: string;
}

export interface MeansOfTransportAndCountry {
  meansOfTransport?: MeansOfTransport;
  country?: Alpha2Code;
  border?: boolean;
  flightNumber?: string;
}

export interface ValidateStep3Options {
  shoppingProducts: ShoppingProduct[];
  declarationId: string;
}

export interface DeclarationData {
  declarationRequest: DeclarationRequest;
  declarationAgentRequest: DeclarationRequest;
  declarationResponse?: SimulatorResponse;
  declarationAgentResponse?: SimulatorResponse;
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
  canCalculateTaxes: boolean;
  publicId: string;
  status: DeclarationStatus;
  totalAmount: number;
  totalCustomDutyAmount: number;
  totalTaxesAmount: number;
  totalVatAmount: number;
  versionDate: Date;
  products: DetailedProduct[];
}

export const DECLARATION_EMPTY_STATE: DeclarationData = {
  declarationRequest: {
    declarationId: undefined,
    contactDetails: {
      age: undefined,
      lastName: undefined,
      firstName: undefined,
      address: undefined,
      city: undefined,
      postalCode: undefined,
      email: undefined,
      phoneNumber: undefined,
    },
    meansOfTransportAndCountry: {
      meansOfTransport: undefined,
      country: undefined,
      flightNumber: undefined,
    },
    defaultCurrency: 'EUR',
    border: undefined,
    shoppingProducts: [],
    products: [],
  },
  declarationAgentRequest: {
    declarationId: undefined,
    contactDetails: {
      age: undefined,
      lastName: undefined,
      firstName: undefined,
      address: undefined,
      city: undefined,
      postalCode: undefined,
      email: undefined,
      phoneNumber: undefined,
    },
    meansOfTransportAndCountry: {
      meansOfTransport: undefined,
      country: undefined,
      flightNumber: undefined,
    },
    defaultCurrency: 'EUR',
    border: undefined,
    shoppingProducts: [],
    products: [],
  },
  declarationResponse: undefined,
  declarationAgentResponse: undefined,
};

export const createDeclarationAppStateSlice: StoreSlice<DeclarationAppStateSlice> = () => ({
  declaration: {
    appState: clone(DECLARATION_EMPTY_STATE),
  },
});
