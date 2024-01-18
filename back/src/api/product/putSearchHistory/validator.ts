import { buildValidationMiddleware } from '../../../core/middlewares';
import { validator } from '../../../core/validator';

export interface PutSearchProductHistoryRequest {
  body: {
    productId: string;
    searchValue: string;
  };
}

export const putSearchProductHistoryValidator = {
  body: validator.object({
    productId: validator.string().uuid().required(),
    searchValue: validator.string().required(),
  }),
};

export default buildValidationMiddleware(putSearchProductHistoryValidator);
