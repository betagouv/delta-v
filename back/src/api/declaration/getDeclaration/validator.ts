import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares/zodValidation.middleware';

export interface IGetOneDeclaration {
  params: {
    declarationId: string;
  };
}

export const getOneDeclarationValidator = z.object({
  params: z.object({
    declarationId: z.string().uuid(),
  }),
});

export type IGetOneDeclarationRequest = z.infer<typeof getOneDeclarationValidator>;

export default buildValidationMiddleware(getOneDeclarationValidator);
