import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares';

export const putFavoriteValidator = z.object({
  body: z.object({
    productId: z
      .string({
        required_error: "L'id du produit est requis",
      })
      .uuid(),
    name: z
      .string({
        required_error: "L'id du produit est requis",
      })
      .min(1, 'Le nom du produit doit contenir au moins 1 caractère')
      .max(30, 'Le nom du produit doit contenir au plus 30 caractères'),
  }),
});

export type PutFavoriteRequest = z.infer<typeof putFavoriteValidator>;

export default buildValidationMiddleware(putFavoriteValidator);
