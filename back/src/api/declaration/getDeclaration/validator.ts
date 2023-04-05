import { buildValidationMiddleware } from '../../../core/middlewares';
import { validator } from '../../../core/validator';

export interface IGetOneDeclaration {
  params: {
    declarationId: string;
  };
}

export const getOneDeclarationValidator = {
  params: validator.object({
    declarationId: validator.string().required(),
  }),
};

export default buildValidationMiddleware(getOneDeclarationValidator);
