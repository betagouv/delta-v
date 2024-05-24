import type { Alpha2Code } from 'i18n-iso-countries';
import { getAlpha2Codes } from 'i18n-iso-countries';
import { RefinementCtx, z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares';
import { MeansOfTransport, meansOfTransport } from '../../common/enums/meansOfTransport.enum';
import { parseBoolean, parseNumber } from '../../../utils/zodParser';

interface RefineMeanOfTransportOptions {
  border: boolean;
  age: number;
  meanOfTransport?: MeansOfTransport;
  contextError: RefinementCtx;
}

//function to validate meanOfTransport required if age >= 18 and border is false
export const refineMeanOfTransport = ({
  border,
  age,
  meanOfTransport,
  contextError,
}: RefineMeanOfTransportOptions): boolean | void => {
  if (border) {
    return true;
  }
  if (age < 18) {
    return true;
  }
  if (!meanOfTransport) {
    return contextError.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['meanOfTransport'],
      message: 'meanOfTransport is required if age >= 18 and border is false',
    });
  }
  if (meansOfTransport.includes(meanOfTransport)) {
    return true;
  }
  return contextError.addIssue({
    code: z.ZodIssueCode.custom,
    path: ['meanOfTransport'],
    message: `${meanOfTransport} is not a valid mean of transport. Valid means of transport are: ${meansOfTransport.join(
      ', ',
    )}`,
  });
};

export const simulateValidator = z.object({
  body: z
    .object({
      shoppingProducts: z.array(
        z.object({
          id: z.string().uuid().optional(),
          customName: z.string().optional().default(''),
          customId: z
            .string({
              required_error: "L'identifiant du produit est requis",
            })
            .uuid(),
          originalValue: parseNumber(z.number().min(0)),
          currency: z.string().length(3).optional().default('EUR'),
        }),
        {
          required_error: 'La liste de produits est requise',
        },
      ),
      border: parseBoolean(z.boolean()),
      age: parseNumber(z.number().int().min(0)),
      country: z.any().refine((country: Alpha2Code) => {
        return Object.keys(getAlpha2Codes()).includes(country);
      }),
      meanOfTransport: z.nativeEnum(MeansOfTransport).optional(),
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

export type SimulateRequest = z.infer<typeof simulateValidator>;

export default buildValidationMiddleware(simulateValidator);
