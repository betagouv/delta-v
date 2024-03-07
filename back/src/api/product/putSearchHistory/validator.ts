import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares';

export const putSearchProductHistoryValidator = z.object({
  body: z.object({
    productId: z
      .string({
        required_error: 'productId is required',
      })
      .uuid(),
    searchValue: z.string({
      required_error: 'searchValue is required',
    }),
  }),
});

export type PutSearchProductHistoryRequest = z.infer<typeof putSearchProductHistoryValidator>;

export default buildValidationMiddleware(putSearchProductHistoryValidator);
