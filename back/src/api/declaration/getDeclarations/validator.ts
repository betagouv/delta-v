/* eslint-disable import/no-extraneous-dependencies */
import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares';
import { parseDate } from '../../../utils/zodParser';
import { refineValidateMeanOfTransports, refineValidateStatus } from '../../../utils/refine.util';

export const getGetDeclarationsValidator = z.object({
  query: z
    .object({
      limit: z.coerce.number().int().min(1).max(100).default(10),
      offset: z.coerce.number().int().min(0).default(0),
      search: z.string().optional(),
      searchPublicId: z.string().optional(),
      status: z
        .string()
        .optional()
        .superRefine((status, customError) => refineValidateStatus({ status, customError })),
      meanOfTransports: z
        .string()
        .optional()
        .superRefine((meanOfTransports, customError) =>
          refineValidateMeanOfTransports({ meanOfTransports, customError }),
        ),
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
