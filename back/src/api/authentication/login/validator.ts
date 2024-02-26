import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares/zodValidation.middleware';

export const loginValidator = z.object({
  body: z.object({
    email: z.string().email("L'email n'est pas valide").min(1, "L'email est requis"),
    password: z.string().min(1, 'Le mot de passe est requis'),
  }),
});

export type LoginRequest = z.infer<typeof loginValidator>;

export default buildValidationMiddleware(loginValidator);
