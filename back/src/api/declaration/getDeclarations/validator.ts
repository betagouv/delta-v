/* eslint-disable import/no-extraneous-dependencies */
import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares';
import { validateMeanOfTransports, validateStatus } from '../../../utils/joiCustomValidators';
import { parseDate, parseNumber } from '../../../utils/zodParser';

export const getGetDeclarationsValidator = z.object({
  query: z
    .object({
      limit: parseNumber(z.number().int().min(1).max(100)).default(10),
      offset: parseNumber(z.number().int().min(0)).default(0),
      search: z.string().optional(),
      searchPublicId: z.string().optional(),
      status: z
        .string()
        .optional()
        .superRefine((status, customError) => {
          if (status) {
            const { isValid, messages } = validateStatus(status);
            if (!isValid) {
              return messages.map((message) =>
                customError.addIssue({
                  code: z.ZodIssueCode.custom,
                  path: ['status'],
                  message: message,
                }),
              );
            }
          }
        }),
      meanOfTransports: z
        .string()
        .optional()
        .superRefine((meanOfTransports, customError) => {
          if (meanOfTransports) {
            const { isValid, messages } = validateMeanOfTransports(meanOfTransports);
            if (!isValid) {
              return messages.map((message) =>
                customError.addIssue({
                  code: z.ZodIssueCode.custom,
                  path: ['meanOfTransports'],
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

export type IGetDeclarationsRequest = z.infer<typeof getGetDeclarationsValidator>;

export default buildValidationMiddleware(getGetDeclarationsValidator);
