import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares';

export const validatePaymentValidator = z.object({
  body: z.object({
    declarationId: z.string({
      required_error: 'Declaration ID is required',
    }),
  }),
});

export type ValidatePaymentRequest = z.infer<typeof validatePaymentValidator>;

export default buildValidationMiddleware(validatePaymentValidator);
