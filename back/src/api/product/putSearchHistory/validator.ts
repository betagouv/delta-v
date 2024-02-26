import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares/zodValidation.middleware';

export const putSearchProductHistoryValidator = z.object({
  body: z.object({
    productId: z.string().uuid().min(1, 'productId is required'),
    searchValue: z.string().min(1, 'searchValue is required'),
  }),
});

export type PutSearchProductHistoryRequest = z.infer<typeof putSearchProductHistoryValidator>;

export default buildValidationMiddleware(putSearchProductHistoryValidator);
