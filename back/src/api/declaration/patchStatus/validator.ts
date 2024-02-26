import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares/zodValidation.middleware';
import { DeclarationStatus } from '../../../entities/declaration.entity';

export const patchStatusValidator = z.object({
  params: z.object({
    declarationId: z.string().uuid().min(1, "L'id de la déclaration est requis"),
  }),
  body: z.object({
    status: z.nativeEnum(DeclarationStatus),
  }),
});

export type PatchStatusRequest = z.infer<typeof patchStatusValidator>;

export default buildValidationMiddleware(patchStatusValidator);
