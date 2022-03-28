import { buildValidationMiddleware, IRequestValidatorSchema } from '../../core/middlewares';
import { validator } from '../../core/validator';
import { MeansOfTransport, meansOfTransport } from '../common/enums/meansOfTransport.enum';
import { ShopingProduct } from './services';

export interface SimulateRequest {
  body: {
    shopingProducts: ShopingProduct[];
    border: boolean;
    age: number;
    meanOfTransport?: MeansOfTransport;
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
      .required(),
    border: validator.boolean().required(),
    age: validator.number().integer().min(0).required(),
    meanOfTransport: validator.string().when('border', {
      is: false,
      then: validator.when('age', {
        is: validator.number().min(15),
        then: validator
          .string()
          .valid(...meansOfTransport)
          .required(),
      }),
    }),
  }),
};

export default buildValidationMiddleware(simulateValidator);
