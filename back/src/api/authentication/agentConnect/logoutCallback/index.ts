import { Router } from 'express';
import { validatedExpressRequest } from '../../../../core/utils/validatedExpressRequest';
import route from './route';
import validationMiddleware from './validator';

export const logoutCallbackAgentConnect = Router().post(
  '/logout-callback',
  validationMiddleware,
  validatedExpressRequest(route),
);
