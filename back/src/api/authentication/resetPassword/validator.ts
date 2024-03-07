import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares';
import { jwtTokenRegex, passwordRegex } from '../common/const/regex';

export const resetPasswordValidator = z.object({
  body: z.object({
    token: z
      .string({
        required_error: 'Le jeton est requis',
      })
      .regex(jwtTokenRegex, { message: 'Le jeton ne respecte pas le bon format' }),
    password: z
      .string({
        required_error: 'Le mot de passe est requis',
      })
      .regex(passwordRegex, { message: 'Le mot de passe ne respecte pas le format demandé' }),
  }),
});

export type IResetPasswordRequest = z.infer<typeof resetPasswordValidator>;

export default buildValidationMiddleware(resetPasswordValidator);
