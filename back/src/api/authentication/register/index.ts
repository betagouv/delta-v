import { Router } from 'express';

import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';
import route from './route';
import validationMiddleware from './validator';

export const register = Router().post(
  '/agent/register',
  validationMiddleware,
  validatedExpressRequest(route),
);
