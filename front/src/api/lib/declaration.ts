import axios from 'axios';

import { ChangeStatusOfDeclarationParams, CreateDeclarationParams } from './types';
import { DeclarationResponse } from '@/stores/declaration/appState.store';
import {
  DetailedProduct,
  GroupedAmountProduct,
  ShoppingProduct,
  SimulatorRequest,
  SimulatorResponse,
} from '@/stores/simulator/appState.store';

interface RequestShoppingProduct {
  id?: string;
  customName?: string;
  customId: string;
  currency: string;
  originalValue: number;
}

interface SimulatorDataRequest {
  age: number;
  meanOfTransport: string;
  country: string;
  border: boolean;
  shoppingProducts: RequestShoppingProduct[];
}

export const checkSimulatorDataRequest = (
  simulatorRequest: SimulatorRequest,
): SimulatorDataRequest => {
  if (
    !simulatorRequest.age ||
    !simulatorRequest.meanOfTransport ||
    !simulatorRequest.country ||
    simulatorRequest.border === undefined
  ) {
    throw Error('Bad simulator request');
  }

  return {
    age: simulatorRequest.age,
    meanOfTransport: simulatorRequest.meanOfTransport,
    country: simulatorRequest.country,
    border: simulatorRequest.border,
    shoppingProducts: simulatorRequest.shoppingProducts.map((shoppingProduct: ShoppingProduct) => ({
      id: shoppingProduct.productId,
      customName: shoppingProduct.name,
      customId: shoppingProduct.id,
      originalValue: shoppingProduct.value,
      currency: shoppingProduct.currency,
    })),
  };
};

export const simulateRequest = async (data: SimulatorDataRequest): Promise<SimulatorResponse> => {
  const response = await axios.post('/simulator/', data);
  return response.data;
};

export interface CreateDeclarationResponse {
  valueProducts?: DetailedProduct[];
  customProducts?: DetailedProduct[];
  amountProducts?: GroupedAmountProduct[];
  total: number;
  totalCustomDuty: number;
  totalVat: number;
  totalTaxes: number;
  franchiseAmount: number;
  declarationPublicId: string;
}

export interface ChangeStatusOfDeclarationResponse {
  message: string;
  code: string;
}

export type GetDeclarationsOptions = {
  limit?: number;
  offset?: number;
  search: string | null;
  searchPublicId: string | null;
};

export const createDeclarationRequest = async (
  params: CreateDeclarationParams,
): Promise<CreateDeclarationResponse> => {
  const bodyParams = {
    shoppingProducts: params.shoppingProducts.map((shoppingProduct: ShoppingProduct) => ({
      id: shoppingProduct.productId,
      customName: shoppingProduct.name,
      customId: shoppingProduct.id,
      originalValue: shoppingProduct.value,
      currency: shoppingProduct.currency,
    })),
    border: params.border,
    age: params.contactDetails.age,
    country: params.meansOfTransportAndCountry.country,
    meanOfTransport: params.meansOfTransportAndCountry.meansOfTransport,
    authorEmail: params.contactDetails.email,
    authorId: 'fc3aed41-e6f2-4937-aa09-7113c1641014',
    authorFullName: `${params.contactDetails.firstName} ${params.contactDetails.lastName}`,
    authorType: 'agent',
    declarantAddressStreet: params.contactDetails.address,
    declarantAddressCity: params.contactDetails.city,
    declarantAddressPostalCode: params.contactDetails.postalCode,
    declarantPhoneNumber: params.contactDetails.phoneNumber,
    declarantEmail: params.contactDetails.email,
    declarantFirstName: params.contactDetails.firstName,
    declarantLastName: params.contactDetails.lastName,
  };

  const { data } = await axios.put(`/declaration/${params.declarationId}`, bodyParams);

  return data;
};

export const getDeclaration = async (id: string): Promise<DeclarationResponse | null> => {
  const { data } = await axios.get<{ declaration: DeclarationResponse }>(`/declaration/${id}`);
  return data.declaration;
};

export const changeStatusOfDeclarationRequest = async (
  params: ChangeStatusOfDeclarationParams,
): Promise<ChangeStatusOfDeclarationResponse> => {
  const bodyParams = {
    status: params.status,
  };

  const { data } = await axios.patch(`/declaration/${params.declarationId}`, bodyParams);

  return data;
};

export const getDeclarations = async ({
  limit,
  offset,
  search,
  searchPublicId,
}: GetDeclarationsOptions): Promise<DeclarationResponse[]> => {
  const { data } = await await axios.get(`/declaration`, {
    params: {
      limit: limit as number,
      offset: offset as number,
      search,
      searchPublicId,
    },
  });

  return data.declarations;
};

export const getDeclarationWithPublicId = async (
  publicId: string,
): Promise<DeclarationResponse | null> => {
  const { data } = await axios.get(`/declaration/public/${publicId}`);
  return data.declaration;
};
