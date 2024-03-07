import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares';
import { jwtTokenRegex } from '../common/const/regex';

export const ValidateEmailValidator = z.object({
  body: z.object({
    token: z
      .string({
        required_error: 'Le jeton est requis',
      })
      .regex(jwtTokenRegex, { message: 'Le jeton ne respecte pas le bon format' }),
  }),
});

export type IValidateEmailRequest = z.infer<typeof ValidateEmailValidator>;

export default buildValidationMiddleware(ValidateEmailValidator);
