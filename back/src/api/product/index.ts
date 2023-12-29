import { Router } from 'express';
import { getAllProducts } from './getAll';
import { putSearchHistory } from './putSearchHistory';
import { getSearchHistory } from './getSearchHistory';

export const productRouter = Router()
  .use(getAllProducts)
  .use(putSearchHistory)
  .use(getSearchHistory);
