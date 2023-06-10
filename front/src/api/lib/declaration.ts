import axios from 'axios';

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
  const response = await axios.post('/api/simulator/', data);
  return response.data;
};
