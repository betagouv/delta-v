import { Alpha2Code, getAlpha2Codes } from 'i18n-iso-countries';
import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares/zodValidation.middleware';
import { AuthorType } from '../../common/enums/author.enum';
import { MeansOfTransport } from '../../common/enums/meansOfTransport.enum';
import { parseNumber } from '../../../utils/zodParser';
import { refineMeanOfTransport } from '../getSimulation/validator';

export const putDeclarationValidator = z.object({
  params: z.object({
    declarationId: z.string().uuid().min(1, "L'id de la déclaration est requis"),
  }),
  body: z
    .object({
      shoppingProducts: z
        .array(
          z.object({
            id: z.string().uuid().optional(),
            customName: z.string().optional().default(''),
            customId: z.string().uuid().min(1, 'customId is required'),
            originalValue: parseNumber(z.number().min(0)),
            currency: z.string().length(3).optional().default('EUR'),
          }),
        )
        .min(1, 'shoppingProducts is required'),
      border: z.any().superRefine((border: boolean, ctx: z.RefinementCtx) => {
        if (typeof border === 'boolean') {
          return true;
        }
        if (typeof border === 'string' && ['true', 'false'].includes(border)) {
          return true;
        }
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['border'],
          message: 'border must be a boolean or a string "true" or "false"',
        });
      }),
      age: parseNumber(z.number().int().min(0)),
      country: z.any().refine((country: Alpha2Code) => {
        return Object.keys(getAlpha2Codes()).includes(country);
      }),
      meanOfTransport: z.nativeEnum(MeansOfTransport).optional(),
      authorType: z.nativeEnum(AuthorType),
      declarantAddressStreet: z.string().min(1, 'declarantAddressStreet is required'),
      declarantAddressPostalCode: z.string().min(1, 'declarantAddressPostalCode is required'),
      declarantAddressCity: z.string().min(1, 'declarantAddressCity is required'),
      declarantEmail: z.string().email().min(1, 'declarantEmail is required'),
      declarantPhoneNumber: z.string().optional().nullable().default(null),
      declarantFirstName: z.string().min(1, 'declarantFirstName is required'),
      declarantLastName: z.string().min(1, 'declarantLastName is required'),
    })
    .superRefine((data, contextError) => {
      return refineMeanOfTransport({
        border: data.border,
        age: data.age,
        meanOfTransport: data.meanOfTransport,
        contextError,
      });
    }),
});

export type PutDeclarationRequest = z.infer<typeof putDeclarationValidator>;

export default buildValidationMiddleware(putDeclarationValidator);
