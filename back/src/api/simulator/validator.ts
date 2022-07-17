import { Alpha2Code, getAlpha2Codes } from 'i18n-iso-countries';
import { buildValidationMiddleware, IRequestValidatorSchema } from '../../core/middlewares';
import { validator } from '../../core/validator';
import { MeansOfTransport, meansOfTransport } from '../common/enums/meansOfTransport.enum';
import { ShoppingProduct } from './services/shoppingProducts';

export interface SimulateRequest {
  body: {
    shoppingProducts: ShoppingProduct[];
    border: boolean;
    age: number;
    country: Alpha2Code;
    meanOfTransport?: MeansOfTransport;
  };
}

export const simulateValidator: IRequestValidatorSchema = {
  body: validator.object({
    shoppingProducts: validator
      .array()
      .items(
        validator.object({
          id: validator.string().uuid().required(),
          customName: validator.string().allow(''),
          customId: validator.string().uuid().required(),
          value: validator.number().min(0).invalid(0).required(),
        }),
      )
      .required(),
    border: validator.boolean().required(),
    age: validator.number().integer().min(0).required(),
    country: validator
      .string()
      .valid(...Object.keys(getAlpha2Codes()))
      .required(),
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
