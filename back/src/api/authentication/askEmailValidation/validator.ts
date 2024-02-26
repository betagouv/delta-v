/* eslint-disable import/no-extraneous-dependencies */
import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares/zodValidation.middleware';

export const askEmailValidationValidator = z.object({
  body: z.object({
    email: z.string().email("L'email n'est pas valide").min(1, "L'email est requis"),
  }),
});

export type AskEmailValidationRequest = z.infer<typeof askEmailValidationValidator>;

export default buildValidationMiddleware(askEmailValidationValidator);
