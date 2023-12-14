import { Router } from 'express';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';

import { RateLimiterType, rateLimiterMiddleware } from '../../../core/middlewares/rateLimiter';
import { jwtMiddleware } from '../../../core/middlewares/jwt.middleware';
import route from './route';
import validator from './validator';

export const deleteFavorite = Router().delete(
  '/favorite/:productId',
  rateLimiterMiddleware({ type: RateLimiterType.DEFAULT }),
  jwtMiddleware({ isAgent: true }),
  validator,
  validatedExpressRequest(route),
);
