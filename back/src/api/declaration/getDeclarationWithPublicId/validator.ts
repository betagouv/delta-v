import { z } from 'zod';
import { buildValidationMiddleware } from '../../../core/middlewares';

export const getOneDeclarationWithPublicIdValidator = z.object({
  params: z.object({
    publicDeclarationId: z.string().length(10),
  }),
});

export type IGetOneDeclarationWithPublicIdRequest = z.infer<
  typeof getOneDeclarationWithPublicIdValidator
>;

export default buildValidationMiddleware(getOneDeclarationWithPublicIdValidator);
