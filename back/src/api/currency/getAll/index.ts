import { Router } from 'express';
import {
  CacheDuration,
  customCacheMiddleware,
} from '../../../core/middlewares/cacheControl.middleware';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';
import route from './route';

export const getAllCurrencies = Router().get(
  '/currency',
  customCacheMiddleware({ cacheDuration: CacheDuration.TEN_MINUTES }),
  validatedExpressRequest(route),
);
