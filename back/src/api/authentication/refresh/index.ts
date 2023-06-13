import { Router } from 'express';

import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';
import route from './route';
import validationMiddleware from './validator';

export const refresh = Router().post(
  '/refresh',
  validationMiddleware,
  validatedExpressRequest(route),
);
