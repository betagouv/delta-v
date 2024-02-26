import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares/zodValidation.middleware';
import { jwtTokenRegex } from '../common/const/regex';

export const ValidateEmailValidator = z.object({
  body: z.object({
    token: z
      .string()
      .regex(jwtTokenRegex, { message: 'Le jeton ne respecte pas le bon format' })
      .min(1, 'Le jeton est requis'),
  }),
});

export type IValidateEmailRequest = z.infer<typeof ValidateEmailValidator>;

export default buildValidationMiddleware(ValidateEmailValidator);
