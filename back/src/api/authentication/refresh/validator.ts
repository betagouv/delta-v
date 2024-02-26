import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares/zodValidation.middleware';
import { jwtTokenRegex } from '../common/const/regex';

export const refreshValidator = z.object({
  body: z.object({
    accessToken: z
      .string()
      .regex(jwtTokenRegex, "L'access token ne respecte pas le bon format")
      .min(1, "L'access token est requis"),
    refreshToken: z
      .string()
      .regex(jwtTokenRegex, 'Le refresh token ne respecte pas le bon format')
      .min(1, 'Le refresh token est requis'),
  }),
});

export type IRefreshRequest = z.infer<typeof refreshValidator>;

export default buildValidationMiddleware(refreshValidator);
