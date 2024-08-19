import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares';

export const verifyPaymentValidator = z.object({
  body: z.object({
    declarationId: z.string({
      required_error: 'Declaration ID is required',
    }),
  }),
});

export type VerifyPaymentRequest = z.infer<typeof verifyPaymentValidator>;

export default buildValidationMiddleware(verifyPaymentValidator);
