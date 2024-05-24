import axios from 'axios';
import type { Alpha2Code } from 'i18n-iso-countries';

import { PutDefaultCountryParams } from './types';

export type Config = {
  defaultCountry: Alpha2Code | null;
};

export const putDefaultCountryRequest = async (params: PutDefaultCountryParams): Promise<void> => {
  const bodyParams = {
    country: params.country,
  };

  await axios.put(`/config/defaultCountry`, bodyParams);
};

export const getDefaultCountryRequest = async (): Promise<Alpha2Code> => {
  const response = await axios.get('/config/defaultCountry');
  return response.data.defaultCountry;
};
