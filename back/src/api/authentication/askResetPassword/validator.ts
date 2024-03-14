import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares';

export const askResetPasswordValidator = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "L'email est requis",
      })
      .email("L'email n'est pas valide"),
  }),
});

export type IAskResetPasswordRequest = z.infer<typeof askResetPasswordValidator>;

export default buildValidationMiddleware(askResetPasswordValidator);
