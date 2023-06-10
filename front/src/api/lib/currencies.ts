import axios from 'axios';

import { Currencies } from '@/model/currencies';

export const getCurrenciesRequest = async (): Promise<Currencies[]> => {
  const response = await axios.get('/api/currency/');
  return response.data.currencies;
};
