/* eslint-disable import/no-extraneous-dependencies */
import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares';

export const askEmailValidationValidator = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "L'email est requis",
      })
      .email("L'email n'est pas valide"),
  }),
});

export type AskEmailValidationRequest = z.infer<typeof askEmailValidationValidator>;

export default buildValidationMiddleware(askEmailValidationValidator);
