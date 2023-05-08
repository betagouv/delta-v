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
    token: validator.string().regex(jwtTokenRegex).required(),
  }),
};

export default buildValidationMiddleware(ValidateEmailValidator);
