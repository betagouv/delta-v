import { z } from 'zod';
import { buildValidationMiddleware } from '../../../../core/middlewares';

export const logoutCallbackValidator = z.object({
  body: z
    .object({
      state: z.string(),
    })
    .strict(),
});

export type ILogoutCallbackRequest = z.infer<typeof logoutCallbackValidator>;

export default buildValidationMiddleware(logoutCallbackValidator);
