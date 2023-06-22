import { buildValidationMiddleware } from '../../../core/middlewares';
import { validator } from '../../../core/validator';
import { jwtTokenRegex, passwordRegex } from '../common/const/regex';

export interface IResetPasswordRequest {
  body: {
    token: string;
    password: string;
  };
}

export const resetPasswordValidator = {
  body: validator.object({
    token: validator.string().regex(jwtTokenRegex).required().messages({
      'string.empty': 'Le jeton est requis',
      'string.pattern.base': 'Le jeton ne respecte pas le bon format',
    }),
    password: validator.string().regex(passwordRegex).required().messages({
      'string.empty': 'Le mot de passe est requis',
      'string.pattern.base': 'Le mot de passe ne respecte pas le format demandé',
    }),
  }),
};

export default buildValidationMiddleware(resetPasswordValidator);
