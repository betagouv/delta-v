import { buildValidationMiddleware, IRequestValidatorSchema } from '../../../core/middlewares';
import { validator } from '../../../core/validator';

export interface SearchProductsRequest {
  query: {
    search: string;
  };
}

export const searchProductsValidator: IRequestValidatorSchema = {
  query: validator.object({
    search: validator.string().required(),
  }),
};

export default buildValidationMiddleware(searchProductsValidator);
