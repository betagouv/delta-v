import { buildValidationMiddleware } from '../../../core/middlewares';
import { validator } from '../../../core/validator';

export interface IGetDeclarationsRequest {
  query: {
    limit: number;
    offset: number;
    search?: string;
    searchPublicId?: string;
  };
}

export const getGetDeclarationsValidator = {
  query: validator.object({
    limit: validator.number().integer().default(10).min(1),
    offset: validator.number().integer().default(0).min(0),
    searchPublicId: validator.string().optional().allow(''),
    search: validator.string().optional().allow(''),
  }),
};

export default buildValidationMiddleware(getGetDeclarationsValidator);
