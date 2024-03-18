import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares';
import { DeclarationStatus } from '../../../entities/declaration.entity';

export const patchStatusValidator = z.object({
  params: z.object({
    declarationId: z
      .string({
        required_error: "L'id de la déclaration est requis",
      })
      .uuid(),
  }),
  body: z.object({
    status: z.nativeEnum(DeclarationStatus),
  }),
});

export type PatchStatusRequest = z.infer<typeof patchStatusValidator>;

export default buildValidationMiddleware(patchStatusValidator);
