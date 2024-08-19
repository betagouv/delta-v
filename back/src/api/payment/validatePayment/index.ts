import { Router } from 'express';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';
import validator from './validator';
import validatePaymentRoute from './route';

export const validatePayment = Router().patch(
  '/payment/validate/:declarationId',
  validator,
  validatedExpressRequest(validatePaymentRoute),
);
