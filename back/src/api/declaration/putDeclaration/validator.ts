import type { Alpha2Code } from 'i18n-iso-countries';
import { getAlpha2Codes } from 'i18n-iso-countries';
import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares';
import { AuthorType } from '../../common/enums/author.enum';
import { MeansOfTransport } from '../../common/enums/meansOfTransport.enum';
import { refineMeanOfTransport } from '../getSimulation/validator';
import { refineValidateBorder } from '../../../utils/refine.util';

export const putDeclarationValidator = z.object({
  params: z.object({
    declarationId: z
      .string({
        required_error: "L'id de la déclaration est requis",
      })
      .uuid(),
  }),
  body: z
    .object({
      shoppingProducts: z.array(
        z.object({
          id: z.string().uuid().optional(),
          customName: z.string().optional(),
          customId: z
            .string({
              required_error: "L'identifiant du produit est requis",
            })
            .uuid(),
          originalValue: z.coerce.number().gt(0),
          currency: z.string().length(3).optional().default('EUR'),
        }),
        {
          required_error: 'La liste des produits est requise',
        },
      ),
      border: z
        .any()
        .superRefine((border, contextError) => refineValidateBorder({ border, contextError })),
      age: z.coerce.number().int().gt(0),
      country: z.any().refine((country: Alpha2Code) => {
        return Object.keys(getAlpha2Codes()).includes(country);
      }),
      meanOfTransport: z.nativeEnum(MeansOfTransport).optional(),
      authorType: z.nativeEnum(AuthorType),
      declarantAddressStreet: z.string({
        required_error: 'declarantAddressStreet is required',
      }),
      declarantAddressPostalCode: z.string({
        required_error: "L'adresse postale du déclarant est requise",
      }),
      declarantAddressCity: z.string({
        required_error: 'La ville du déclarant est requise',
      }),
      declarantEmail: z
        .string({
          required_error: "L'email du déclarant est requis",
        })
        .email(),
      declarantPhoneNumber: z.string().optional().nullable().default(null),
      declarantFirstName: z.string({
        required_error: 'Le prénom du déclarant est requis',
      }),
      declarantLastName: z.string({
        required_error: 'Le nom du déclarant est requis',
      }),
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
