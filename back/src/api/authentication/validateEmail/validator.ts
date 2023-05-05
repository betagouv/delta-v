import { buildValidationMiddleware } from '../../../core/middlewares';
import { validator } from '../../../core/validator';
<<<<<<< HEAD
import { jwtTokenRegex } from '../common/const/regex';
=======
>>>>>>> 7972cd9 (validate email endpoint)

export interface IValidateEmailRequest {
  body: {
    token: string;
  };
}

export const ValidateEmailValidator = {
  body: validator.object({
<<<<<<< HEAD
    token: validator.string().regex(jwtTokenRegex).required(),
=======
    token: validator.string().required(),
>>>>>>> 7972cd9 (validate email endpoint)
  }),
};

export default buildValidationMiddleware(ValidateEmailValidator);
