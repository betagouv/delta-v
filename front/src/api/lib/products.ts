import axios from 'axios';

import { ICommonResponse } from './types';
import { Product } from '@/model/product';

export type SearchProductHistoryItem = Pick<Product, 'id' | 'name'>;

export type PutSearchProductHistoryParams = {
  productId: string;
};

export const getAllProductRequest = async (): Promise<Product[]> => {
  const response = await axios.get('/product/');
  return response.data.products;
};

export const getSearchProductHistoryRequest = async (): Promise<SearchProductHistoryItem[]> => {
  const response = await axios.get('/product/history/');
  return response.data.productsHistory;
};

export const putSearchProductHistoryRequest = async (
  params: PutSearchProductHistoryParams,
): Promise<ICommonResponse> => {
  const bodyParams = {
    productId: params.productId,
  };
  const { data } = await axios.put('/product/history/', bodyParams);
  return data;
};
