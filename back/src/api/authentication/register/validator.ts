import { buildValidationMiddleware } from '../../../core/middlewares';
import { validator } from '../../../core/validator';
import config from '../../../loader/config';
import { emailDouaneRegex, passwordRegex } from '../common/const/regex';

export interface IRegisterRequest {
  body: {
    email: string;
    password: string;
  };
}

export const registerValidator = {
  body: validator.object({
    email: validator
      .alternatives([
        validator
          .string()
          .valid(...config.WHITE_LIST_AGENT_EMAIL)
          .messages({
            'any.allowOnly': 'L\'email doit appartenir au domaine "@douane.finances.gouv.fr"',
          }),
        validator.string().regex(emailDouaneRegex).messages({
          'string.pattern.base': 'L\'email doit appartenir au domaine "@douane.finances.gouv.fr"',
        }),
      ])
      .required()
      .messages({
        'string.empty': "L'email est requis",
      }),
    password: validator.string().regex(passwordRegex).required().messages({
      'string.empty': 'Le mot de passe est requis',
      'string.pattern.base': 'Le mot de passe ne respecte pas le format demandé',
    }),
  }),
};

export default buildValidationMiddleware(registerValidator);
