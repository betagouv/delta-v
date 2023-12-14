import { Router } from 'express';
import { getAllProducts } from './getAll';
import { patchSearchHistory } from './putSearchHistory';
import { getSearchHistory } from './getSearchHistory';

export const productRouter = Router()
  .use(getAllProducts)
  .use(patchSearchHistory)
  .use(getSearchHistory);
