import { Router } from 'express';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';
import validator from './validator';
import route from './route';

export const rejectPayment = Router().patch(
  '/payment/reject/:declarationId',
  validator,
  validatedExpressRequest(route),
);
