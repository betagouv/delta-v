import { Router } from 'express';
import { validatedExpressRequest } from '../../../../core/utils/validatedExpressRequest';
import route from './route';
import validationMiddleware from './validator';

export const authenticateAgentConnect = Router().get(
  '/authenticate',
  validationMiddleware,
  validatedExpressRequest(route),
);
