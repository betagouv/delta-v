import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares';

export const paymentValidator = z.object({
  body: z.object({
    declarationId: z.string({
      required_error: 'Declaration ID is required',
    }),
  }),
});

export type PaymentRequest = z.infer<typeof paymentValidator>;

export default buildValidationMiddleware(paymentValidator);
