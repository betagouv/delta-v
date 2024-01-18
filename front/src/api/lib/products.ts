import axios from 'axios';

import { ICommonResponse } from './types';
import { Product } from '@/model/product';

export type SearchProductHistoryItem = {
  id: string;
  name: string;
  searchValue: string;
};

export type PutSearchProductHistoryParams = {
  productId: string;
  searchValue: string;
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
    searchValue: params.searchValue,
  };
  const { data } = await axios.put('/product/history/', bodyParams);
  return data;
};
