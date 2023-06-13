import axios from 'axios';

import { Product } from '@/model/product';

export const getAllProductRequest = async (): Promise<Product[]> => {
  const response = await axios.get('/product/');
  return response.data.products;
};
