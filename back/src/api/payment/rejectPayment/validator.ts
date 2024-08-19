import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares';

export const rejectPaymentValidator = z.object({
  body: z.object({
    declarationId: z.string({
      required_error: 'Declaration ID is required',
    }),
  }),
});

export type RejectPaymentRequest = z.infer<typeof rejectPaymentValidator>;

export default buildValidationMiddleware(rejectPaymentValidator);
