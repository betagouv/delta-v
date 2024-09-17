import { z } from 'zod';
import { buildValidationMiddleware } from '../../../../core/middlewares';
import { jwtTokenRegex } from '../../common/const/regex';

export const refreshValidator = z.object({
  body: z.object({
    accessToken: z
      .string({
        required_error: "L'access token est requis",
      })
      .regex(jwtTokenRegex, "L'access token est invalide"),
    refreshToken: z
      .string({
        required_error: 'Le refresh token est requis',
      })
      .regex(jwtTokenRegex, "L'access token est invalide"),
    lastRefresh: z.boolean(),
  }),
});

export type IRefreshRequest = z.infer<typeof refreshValidator>;

export default buildValidationMiddleware(refreshValidator);
