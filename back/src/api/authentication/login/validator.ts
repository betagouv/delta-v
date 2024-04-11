import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares';

export const loginValidator = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "L'email est requis",
      })
      .email('Mail invalide'),
    password: z.string({
      required_error: 'Le mot de passe est requis',
    }),
  }),
});

export type LoginRequest = z.infer<typeof loginValidator>;

export default buildValidationMiddleware(loginValidator);
