import { z } from 'zod';
import { buildValidationMiddleware } from '../../../../core/middlewares';

export const authenticateValidator = z.object({
  body: z
    .object({
      code: z.string(),
      state: z.string(),
      nonce: z.string(),
    })
    .strict(),
});

export type IAuthenticateRequest = z.infer<typeof authenticateValidator>;

export default buildValidationMiddleware(authenticateValidator);
