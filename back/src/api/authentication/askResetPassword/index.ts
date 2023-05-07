import { Router } from 'express';

import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';
import route from './route';
import validationMiddleware from './validator';

export const askResetPassword = Router().post(
  '/password/ask',
  validationMiddleware,
  validatedExpressRequest(route),
);
