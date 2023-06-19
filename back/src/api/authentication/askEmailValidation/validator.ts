import { buildValidationMiddleware, IRequestValidatorSchema } from '../../../core/middlewares';
import { validator } from '../../../core/validator';

export interface AskEmailValidationRequest {
  body: {
    email: string;
  };
}

export const askEmailValidationValidator: IRequestValidatorSchema = {
  body: validator.object({
    email: validator.string().email(),
  }),
};

export default buildValidationMiddleware(askEmailValidationValidator);
