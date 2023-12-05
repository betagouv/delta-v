import { Router } from 'express';

import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';
import { jwtMiddleware } from '../../../core/middlewares/jwt.middleware';
import route from './route';
import validator from './validator';

export const changePassword = Router().post(
  '/password/change',
  jwtMiddleware({ isAgent: true }),
  validator,
  validatedExpressRequest(route),
);
