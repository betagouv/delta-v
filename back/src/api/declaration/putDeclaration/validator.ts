import { Alpha2Code, getAlpha2Codes } from 'i18n-iso-countries';
import { buildValidationMiddleware, IRequestValidatorSchema } from '../../../core/middlewares';
import { validator } from '../../../core/validator';
import { AuthorType } from '../../common/enums/author.enum';
import { meansOfTransport, MeansOfTransport } from '../../common/enums/meansOfTransport.enum';

export interface PutDeclarationRequest {
  params: {
    declarationId: string;
  };
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
    authorEmail: string;
    authorId?: string;
    authorFullName: string;
    authorType: AuthorType;
    declarantAddressStreet: string;
    declarantAddressPostalCode: string;
    declarantAddressCity: string;
    declarantEmail: string;
    declarantPhoneNumber: string | null;
    declarantFirstName: string;
    declarantLastName: string;
  };
}

export const putDeclarationValidator: IRequestValidatorSchema = {
  params: validator.object({
    declarationId: validator.string().uuid().required(),
  }),
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
    authorEmail: validator.string().email().required(),
    authorId: validator.string().uuid(),
    authorFullName: validator.string().required(),
    authorType: validator
      .string()
      .valid(...Object.values(AuthorType))
      .required(),
    declarantAddressStreet: validator.string().required(),
    declarantAddressPostalCode: validator.string().required(),
    declarantAddressCity: validator.string().required(),
    declarantEmail: validator.string().email().required(),
    declarantPhoneNumber: validator.string().default(null),
    declarantFirstName: validator.string().required(),
    declarantLastName: validator.string().required(),
  }),
};

export default buildValidationMiddleware(putDeclarationValidator);
