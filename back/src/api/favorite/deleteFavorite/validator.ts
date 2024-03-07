import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares';

export const deleteFavoriteValidator = z.object({
  params: z.object({
    productId: z
      .string({
        required_error: "L'id du produit est requis",
      })
      .uuid(),
  }),
});

export type DeleteFavoriteRequest = z.infer<typeof deleteFavoriteValidator>;

export default buildValidationMiddleware(deleteFavoriteValidator);
