import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares/zodValidation.middleware';

export const askResetPasswordValidator = z.object({
  body: z.object({
    email: z.string().email("L'email n'est pas valide").min(1, "L'email est requis"),
  }),
});

export type IAskResetPasswordRequest = z.infer<typeof askResetPasswordValidator>;

export default buildValidationMiddleware(askResetPasswordValidator);
