import { Router } from 'express';
import { getAllProducts } from './getAll';

export const productRouter = Router().use(getAllProducts);
