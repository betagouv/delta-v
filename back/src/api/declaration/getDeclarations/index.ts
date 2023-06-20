import { Router } from 'express';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';
import { jwtMiddleware } from '../../../core/middlewares/jwt.middleware';
import route from './route';
import validator from './validator';

export const getDeclarations = Router().get(
  '/declaration',
  jwtMiddleware({ isAgent: true }),
  validator,
  validatedExpressRequest(route),
);
