import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares';

export const putFavoriteValidator = z.object({
  body: z.object({
    productId: z.string().uuid().min(1, "L'id du produit est requis"),
    name: z
      .string()
      .min(3, 'Le nom du produit doit contenir au moins 3 caractères')
      .max(30, 'Le nom du produit doit contenir au plus 30 caractères'),
  }),
});

export type PutFavoriteRequest = z.infer<typeof putFavoriteValidator>;

export default buildValidationMiddleware(putFavoriteValidator);
