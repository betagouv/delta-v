import { buildValidationMiddleware, IRequestValidatorSchema } from '../../core/middlewares';
import { validator } from '../../core/validator';
import { ShopingProduct } from './services';

export interface SimulateRequest {
  body: {
    shopingProducts: ShopingProduct[];
  };
}

export const simulateValidator: IRequestValidatorSchema = {
  body: validator.object({
    shopingProducts: validator
      .array()
      .items(
        validator.object({
          id: validator.string().uuid().required(),
          amount: validator.number().integer().min(1).required(),
          price: validator.number().min(0).invalid(0).required(),
        }),
      )
      .min(1)
      .required(),
  }),
};

export default buildValidationMiddleware(simulateValidator);
