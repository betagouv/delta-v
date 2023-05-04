import { buildValidationMiddleware } from '../../../core/middlewares';
import { validator } from '../../../core/validator';

export interface IRegisterRequest {
  body: {
    email: string;
    password: string;
  };
}

export const registerValidator = {
  body: validator.object({
    email: validator
      .string()
      .email()
      .regex(/^[a-z]+(\.[a-z]+)*@douane\.finances\.gouv\.fr$/)
      .required(),
    password: validator
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      .required(),
  }),
};

export default buildValidationMiddleware(registerValidator);
