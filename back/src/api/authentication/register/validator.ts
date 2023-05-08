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
    email: validator.string().email().regex(emailDouaneRegex).required(),
    password: validator.string().regex(passwordRegex).required(),
  }),
};

export default buildValidationMiddleware(registerValidator);
