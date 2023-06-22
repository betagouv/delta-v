import { buildValidationMiddleware } from '../../../core/middlewares';
import { validator } from '../../../core/validator';
import { emailDouaneRegex, passwordRegex } from '../common/const/regex';

export interface IRegisterRequest {
  body: {
    email: string;
    password: string;
  };
}

export const registerValidator = {
  body: validator.object({
    email: validator.string().regex(emailDouaneRegex).email().required().messages({
      'string.empty': "L'email est requis",
      'string.pattern.base': 'L\'email doit appartenir au domaine "@douane.finances.gouv.fr"',
      'string.email': "L'email n'est pas valide",
    }),
    password: validator.string().regex(passwordRegex).required().messages({
      'string.empty': 'Le mot de passe est requis',
      'string.pattern.base': 'Le mot de passe ne respecte pas le format demandé',
    }),
  }),
};

export default buildValidationMiddleware(registerValidator);
