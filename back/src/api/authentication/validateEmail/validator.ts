import { buildValidationMiddleware } from '../../../core/middlewares';
import { validator } from '../../../core/validator';

export interface IValidateEmailRequest {
  body: {
    token: string;
  };
}

export const ValidateEmailValidator = {
  body: validator.object({
    token: validator.string().required(),
  }),
};

export default buildValidationMiddleware(ValidateEmailValidator);
