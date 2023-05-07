import { buildValidationMiddleware } from '../../../core/middlewares';
import { validator } from '../../../core/validator';

export interface IAskResetPasswordRequest {
  body: {
    email: string;
  };
}

export const askResetPasswordValidator = {
  body: validator.object({
    email: validator.string().email().required(),
  }),
};

export default buildValidationMiddleware(askResetPasswordValidator);
