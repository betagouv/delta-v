import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares/zodValidation.middleware';

export const deleteFavoriteValidator = z.object({
  params: z.object({
    productId: z.string().uuid().min(1, "L'id du produit est requis"),
  }),
});

export type DeleteFavoriteRequest = z.infer<typeof deleteFavoriteValidator>;

export default buildValidationMiddleware(deleteFavoriteValidator);
