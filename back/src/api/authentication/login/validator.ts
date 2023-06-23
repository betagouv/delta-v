import { buildValidationMiddleware, IRequestValidatorSchema } from '../../../core/middlewares';
import { validator } from '../../../core/validator';

export interface LoginRequest {
  body: {
    email: string;
    password: string;
  };
}

export const loginValidator: IRequestValidatorSchema = {
  body: validator.object({
    email: validator.string().required().email().messages({
      'string.empty': "L'email est requis",
      'string.email': "L'email n'est pas valide",
    }),
    password: validator.string().required().messages({
      'string.empty': 'Le mot de passe est requis',
    }),
  }),
};

export default buildValidationMiddleware(loginValidator);
