import { buildValidationMiddleware, IRequestValidatorSchema } from '../../../core/middlewares';
import { validator } from '../../../core/validator';

export interface DeleteFavoriteRequest {
  params: {
    productId: string;
  };
}

export const deleteFavoriteValidator: IRequestValidatorSchema = {
  params: validator
    .object({
      productId: validator.string().uuid().required(),
    })
    .required(),
};

export default buildValidationMiddleware(deleteFavoriteValidator);
