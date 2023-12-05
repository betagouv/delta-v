import { buildValidationMiddleware } from '../../../core/middlewares';
import { validator } from '../../../core/validator';
import { passwordRegex } from '../common/const/regex';

export interface IChangePasswordRequest {
  body: {
    oldPassword: string;
    newPassword: string;
  };
}

export const changePasswordValidator = {
  body: validator.object({
    oldPassword: validator.string().required().messages({
      'string.empty': 'Le mot de passe est requis',
    }),
    newPassword: validator.string().regex(passwordRegex).required().messages({
      'string.empty': 'Le mot de passe est requis',
      'string.pattern.base': 'Le mot de passe ne respecte pas le format demandé',
    }),
  }),
};

export default buildValidationMiddleware(changePasswordValidator);
