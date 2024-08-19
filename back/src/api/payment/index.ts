import { Router } from 'express';
import { payment } from './initiatePayment';
import { verifyPayment } from './paymentVerify';
import { rejectPayment } from './rejectPayment';
import { validatePayment } from './validatePayment';

export const paymentRouter = Router()
  .use(payment)
  .use(verifyPayment)
  .use(validatePayment)
  .use(rejectPayment);
