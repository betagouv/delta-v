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
    token: validator.string().regex(jwtTokenRegex).required(),
    password: validator.string().regex(passwordRegex).required(),
  }),
};

export default buildValidationMiddleware(resetPasswordValidator);
