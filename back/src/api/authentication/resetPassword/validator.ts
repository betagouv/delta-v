import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares';
import { jwtTokenRegex, passwordRegex } from '../common/const/regex';

export const resetPasswordValidator = z.object({
  body: z.object({
    token: z
      .string()
      .regex(jwtTokenRegex, { message: 'Le jeton ne respecte pas le bon format' })
      .min(1, { message: 'Le jeton est requis' }),
    password: z
      .string()
      .regex(passwordRegex, { message: 'Le mot de passe ne respecte pas le format demandé' })
      .min(1, 'Le mot de passe est requis'),
  }),
});

export type IResetPasswordRequest = z.infer<typeof resetPasswordValidator>;

export default buildValidationMiddleware(resetPasswordValidator);
