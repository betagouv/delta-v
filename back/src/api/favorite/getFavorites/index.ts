import { Router } from 'express';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';
import { jwtMiddleware } from '../../../core/middlewares/jwt.middleware';
import route from './route';

export const getFavorites = Router().get(
  '/favorite',
  jwtMiddleware({ isAgent: true }),
  validatedExpressRequest(route),
);
