import { Router } from 'express';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';
import { jwtMiddleware } from '../../../core/middlewares/jwt.middleware';
import route from './route';

export const getDefaultCountry = Router().get(
  '/config/defaultCountry',
  jwtMiddleware({ isAgent: true }),
  validatedExpressRequest(route),
);
