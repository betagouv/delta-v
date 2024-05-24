import { Router } from 'express';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';
import { jwtMiddleware } from '../../../core/middlewares/jwt.middleware';
import route from './route';
import validator from './validator';

export const putDefaultCountry = Router().put(
  '/config/defaultCountry',
  jwtMiddleware({ isAgent: true }),
  validator,
  validatedExpressRequest(route),
);
