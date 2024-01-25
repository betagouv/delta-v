import { buildValidationMiddleware, IRequestValidatorSchema } from '../../../core/middlewares';
import { validator } from '../../../core/validator';

export interface PutFavoriteRequest {
  body: {
    productId: string;
    name: string;
  };
}

export const putFavoriteValidator: IRequestValidatorSchema = {
  body: validator
    .object({
      productId: validator.string().uuid().required(),
      name: validator.string().min(3).max(30).required(),
    })
    .required(),
};

export default buildValidationMiddleware(putFavoriteValidator);
