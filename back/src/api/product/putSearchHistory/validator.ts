import { buildValidationMiddleware } from '../../../core/middlewares';
import { validator } from '../../../core/validator';

export interface PutSearchProductHistoryRequest {
  body: {
    productId: string;
  };
}

export const putSearchProductHistoryValidator = {
  body: validator.object({
    productId: validator.string().uuid().required(),
  }),
};

export default buildValidationMiddleware(putSearchProductHistoryValidator);
