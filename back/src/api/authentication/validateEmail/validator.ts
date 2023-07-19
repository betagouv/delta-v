import { buildValidationMiddleware } from '../../../core/middlewares';
import { validator } from '../../../core/validator';
import { jwtTokenRegex } from '../common/const/regex';

export interface IValidateEmailRequest {
  body: {
    token: string;
  };
}

export const ValidateEmailValidator = {
  body: validator.object({
    token: validator.string().regex(jwtTokenRegex).required().messages({
      'string.empty': 'Le jeton est requis',
      'string.pattern.base': 'Le jeton ne respecte pas le bon format',
    }),
  }),
};

export default buildValidationMiddleware(ValidateEmailValidator);
