import { Router } from 'express';
import { validatedExpressRequest } from '../../../../core/utils/validatedExpressRequest';
import route from './route';

export const initiateAgentConnect = Router().get(
  '/agent-connect/initiate',
  validatedExpressRequest(route),
);
