import { buildValidationMiddleware, IRequestValidatorSchema } from '../../../core/middlewares';
import { validator } from '../../../core/validator';

export interface PutFavoriteRequest {
  body: {
    productId: string;
  };
}

export const putFavoriteValidator: IRequestValidatorSchema = {
  body: validator
    .object({
      productId: validator.string().uuid().required(),
    })
    .required(),
};

export default buildValidationMiddleware(putFavoriteValidator);
