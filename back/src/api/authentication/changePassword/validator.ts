import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares';
import { passwordRegex } from '../common/const/regex';

export const changePasswordValidator = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Le mot de passe actuel est requis',
    }),
    newPassword: z
      .string({
        required_error: 'Le nouveau mot de passe est requis',
      })
      .regex(passwordRegex, 'Le mot de passe ne respecte pas le format demandé'),
  }),
});

export type IChangePasswordRequest = z.infer<typeof changePasswordValidator>;

export default buildValidationMiddleware(changePasswordValidator);
