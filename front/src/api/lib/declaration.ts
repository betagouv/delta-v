import axios from 'axios';

import { BaseAPIResponse, CreateDeclarationParams } from './types';
import { DeclarationResponse } from '@/stores/declaration/appState.store';
import {
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
    !simulatorRequest.border
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

export interface CreateDeclarationResponse extends BaseAPIResponse {
  context: {
    id: string;
  };
}

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
