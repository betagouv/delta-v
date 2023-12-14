import { buildValidationMiddleware } from '../../../core/middlewares';
import { validator } from '../../../core/validator';

export interface PatchSearchProductHistoryRequest {
  body: {
    productId: string;
  };
}

export const patchSearchProductHistoryValidator = {
  body: validator.object({
    productId: validator.string().uuid().required(),
  }),
};

export default buildValidationMiddleware(patchSearchProductHistoryValidator);
