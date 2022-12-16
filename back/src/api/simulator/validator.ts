import { Alpha2Code, getAlpha2Codes } from 'i18n-iso-countries';
import { buildValidationMiddleware, IRequestValidatorSchema } from '../../core/middlewares';
import { validator } from '../../core/validator';
import { meansOfTransport, MeansOfTransport } from '../common/enums/meansOfTransport.enum';

export interface SimulateRequest {
  body: {
    shoppingProducts: {
      id?: string;
      customName?: string;
      customId: string;
      originalValue: number;
      currency?: string;
    }[];
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
          id: validator.string().uuid(),
          customName: validator.string().allow(''),
          customId: validator.string().uuid().required(),
          originalValue: validator.number().min(0).invalid(0).required(),
          currency: validator.string().length(3).default('EUR'),
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
