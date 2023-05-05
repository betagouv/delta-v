import { Router } from 'express';

import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';
import route from './route';
import validationMiddleware from './validator';

export const validateEmail = Router().post(
  '/email/validate',
  validationMiddleware,
  validatedExpressRequest(route),
);
