import { Router } from 'express';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';
import route from './route';
import validationMiddleware from './validator';

export const authenticate = Router().post(
  '/agent-connect/authenticate',
  validationMiddleware,
  validatedExpressRequest(route),
);
