// eslint-disable-next-line import/no-extraneous-dependencies
import { z } from 'zod';
import { validateNewsTags } from '../../../utils/joiCustomValidators';
import { buildValidationMiddleware } from '../../../core/middlewares/zodValidation.middleware';
import { parseDate, parseNumber } from '../../../utils/zodParser';

export const getActualitiesValidator = z.object({
  query: z
    .object({
      limit: parseNumber(z.number().int().min(1).max(100)).default(10),
      offset: parseNumber(z.number().int().min(0)).default(0),
      search: z.string().optional(),
      tags: z
        .string()
        .optional()
        .superRefine((tags, customError) => {
          if (tags) {
            const { isValid, messages } = validateNewsTags(tags);
            if (!isValid) {
              return messages.map((message) =>
                customError.addIssue({
                  code: z.ZodIssueCode.custom,
                  path: ['tags'],
                  message: message,
                }),
              );
            }
          }
        }),
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
