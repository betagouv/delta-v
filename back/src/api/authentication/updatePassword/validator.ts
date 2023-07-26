import { buildValidationMiddleware } from '../../../core/middlewares';
import { validator } from '../../../core/validator';
import { passwordRegex } from '../common/const/regex';

export interface IUpdatePasswordRequest {
  body: {
    currentPassword: string;
    newPassword: string;
    newPasswordVerification: string;
  };
}

export const updatePasswordValidator = {
  body: validator.object({
    currentPassword: validator.string().regex(passwordRegex).required().messages({
      'string.empty': 'Le mot de passe est requis',
      'string.pattern.base': 'Le mot de passe ne respecte pas le format demandé',
    }),
    newPassword: validator
      .string()
      .invalid(validator.ref('currentPassword'))
      .regex(passwordRegex)
      .required()
      .messages({
        'string.empty': 'Le mot de passe est requis',
        'string.pattern.base': 'Le mot de passe ne respecte pas le format demandé',
        'any.only': "Le nouveau mot de passe ne peut pas être identique à l'ancien",
        'any.invalid': "Le nouveau mot de passe ne peut pas être identique à l'ancien",
      }),
    newPasswordVerification: validator
      .string()
      .valid(validator.ref('newPassword'))
      .required()
      .messages({
        'string.empty': 'La vérification du mot de passe est requise',
        'any.only': 'La vérification du mot de passe ne correspond pas au mot de passe',
      }),
  }),
};

export default buildValidationMiddleware(updatePasswordValidator);
