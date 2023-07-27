import { Router } from 'express';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';
import { RateLimiterType, rateLimiterMiddleware } from '../../../core/middlewares/rateLimiter';
import route from './route';
import validator from './validator';

export const login = Router().post(
  '/login',
  rateLimiterMiddleware({ type: RateLimiterType.DEFAULT }),
  validator,
  validatedExpressRequest(route),
);
