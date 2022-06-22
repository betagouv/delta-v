import { buildValidationMiddleware, IRequestValidatorSchema } from '../../../core/middlewares';
import { validator } from '../../../core/validator';

export interface GetAverageRequest {
  params: {
    id: string;
  };
}

export const getAverageValidator: IRequestValidatorSchema = {
  params: validator.object({
    id: validator.string().uuid().required(),
  }),
};

export default buildValidationMiddleware(getAverageValidator);
