import { z } from 'zod';
import { buildValidationMiddleware } from '../../../../core/middlewares';

export const authenticateValidator = z.object({
  query: z
    .object({
      code: z.string(),
      state: z.string(),
      iss: z.string(),
    })
    .strict(),
});

export type IAuthenticateRequest = z.infer<typeof authenticateValidator>;

export default buildValidationMiddleware(authenticateValidator);
