import { Router } from 'express';

import { jwtMiddleware } from '../../../core/middlewares/jwt.middleware';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';
import route from './route';
import validationMiddleware from './validator';

export const updatePassword = Router().patch(
  '/password',
  jwtMiddleware({ isAgent: true }),
  validationMiddleware,
  validatedExpressRequest(route),
);
