import { buildValidationMiddleware } from '../../../core/middlewares';
import { validator } from '../../../core/validator';

export interface IGetOneDeclarationWithPublicId {
  params: {
    publicDeclarationId: string;
  };
}

export const getOneDeclarationWithPublicIdValidator = {
  params: validator.object({
    publicDeclarationId: validator.string().length(10).required(),
  }),
};

export default buildValidationMiddleware(getOneDeclarationWithPublicIdValidator);
