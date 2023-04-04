import { buildValidationMiddleware } from '../../../core/middlewares';
import { validator } from '../../../core/validator';

export interface IGetOneDeclarationForAgentRequest {
  params: {
    declarationId: string;
  };
}

export const getOneDeclarationForAgentValidator = {
  params: validator.object({
    declarationId: validator.string().required(),
  }),
};

export default buildValidationMiddleware(getOneDeclarationForAgentValidator);
