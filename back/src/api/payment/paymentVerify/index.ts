import { Router } from 'express';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';
import verifyRoute from './route';
import verifyValidator from './validator';

export const verifyPayment = Router().post(
  '/payment/verify',
  verifyValidator,
  validatedExpressRequest(verifyRoute),
);
