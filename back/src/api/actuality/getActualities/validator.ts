import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares';
import { parseDate, parseNumber } from '../../../utils/zodParser';
import { refineValidateNewsTags } from '../../../utils/refine.util';

export const getActualitiesValidator = z.object({
  query: z
    .object({
      limit: parseNumber(z.number().int().min(1).max(100)).default(10),
      offset: parseNumber(z.number().int().min(0)).default(0),
      search: z.string().optional(),
      tags: z
        .string()
        .optional()
        .superRefine((tags, customError) => refineValidateNewsTags({ tags, customError })),
      startDate: parseDate(z.date()).optional(),
      endDate: parseDate(z.date()).optional(),
    })
    .refine((data) => {
      if (data.startDate && data.endDate) {
        return data.startDate < data.endDate;
      }
      return true;
    }),
});

export type IGetActualitiesRequest = z.infer<typeof getActualitiesValidator>;

export default buildValidationMiddleware(getActualitiesValidator);
