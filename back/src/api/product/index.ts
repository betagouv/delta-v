import { Router } from 'express';
import { getAllProducts } from './getAll';
import { searchProducts } from './search';

export const productRouter = Router().use(getAllProducts).use(searchProducts);
