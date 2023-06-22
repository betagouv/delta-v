import { buildValidationMiddleware } from '../../../core/middlewares';
import { validator } from '../../../core/validator';

export interface IAskResetPasswordRequest {
  body: {
    email: string;
  };
}

export const askResetPasswordValidator = {
  body: validator.object({
    email: validator.string().email().required().messages({
      'string.empty': "L'email est requis",
      'string.email': "L'email n'est pas valide",
    }),
  }),
};

export default buildValidationMiddleware(askResetPasswordValidator);
