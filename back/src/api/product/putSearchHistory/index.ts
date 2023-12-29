import { Router } from 'express';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';
import { jwtMiddleware } from '../../../core/middlewares/jwt.middleware';
import { RateLimiterType, rateLimiterMiddleware } from '../../../core/middlewares/rateLimiter';
import route from './route';
import validator from './validator';

export const putSearchHistory = Router().put(
  '/product/history',
  rateLimiterMiddleware({ type: RateLimiterType.DEFAULT }),
  jwtMiddleware({ isAgent: true }),
  validator,
  validatedExpressRequest(route),
);
