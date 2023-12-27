import axios from 'axios';

import { CreateFavoriteParams } from './types';

export const createFavoriteRequest = async (params: CreateFavoriteParams): Promise<void> => {
  const bodyParams = {
    productId: params.productId,
  };

  await axios.put(`/favorite`, bodyParams);
};

export const removeFavoriteRequest = async (productId: string): Promise<void> => {
  await axios.delete(`/favorite/${productId}`);
};

export const getFavorites = async (): Promise<string[]> => {
  const { data } = await axios.get(`/favorite`);
  return data.favorites;
};
