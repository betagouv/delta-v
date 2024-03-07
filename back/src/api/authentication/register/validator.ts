import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares';
import { config } from '../../../loader/config';
import { emailDouaneRegex, passwordRegex } from '../common/const/regex';

export const registerValidator = z.object({
  body: z.object({
    email: z.string().refine(
      (email) => {
        if (config.WHITE_LIST_AGENT_EMAIL.length > 0) {
          return config.WHITE_LIST_AGENT_EMAIL.includes(email) || emailDouaneRegex.test(email);
        }

        return emailDouaneRegex.test(email);
      },
      {
        message: 'L\'email doit appartenir au domaine "@douane.finances.gouv.fr"',
      },
    ),
    password: z
      .string({
        required_error: 'Le mot de passe est requis',
      })
      .regex(passwordRegex, 'Le mot de passe ne respecte pas le format demandé'),
  }),
});

export type IRegisterRequest = z.infer<typeof registerValidator>;

export default buildValidationMiddleware(registerValidator);
