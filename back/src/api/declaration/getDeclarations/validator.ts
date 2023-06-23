import { buildValidationMiddleware } from '../../../core/middlewares';
import { validator } from '../../../core/validator';
import { validateMeanOfTransports, validateStatus } from '../../../utils/joiCustomValidators';

export interface IGetDeclarationsRequest {
  query: {
    limit: number;
    offset: number;
    search?: string;
    searchPublicId?: string;
    status?: string;
    meanOfTransports?: string;
    startDate?: Date;
    endDate?: Date;
  };
}

export const getGetDeclarationsValidator = {
  query: validator.object({
    limit: validator.number().integer().default(10).min(1).max(100),
    offset: validator.number().integer().default(0).min(0),
    searchPublicId: validator.string().optional().allow(''),
    search: validator.string().optional().allow(''),
    status: validator.string().custom(validateStatus).optional(),
    meanOfTransports: validator.string().custom(validateMeanOfTransports).optional(),
    startDate: validator.date().optional(),
    endDate: validator.when('startDate', {
      is: validator.exist(),
      then: validator.date().min(validator.ref('startDate')).optional(),
      otherwise: validator.date().optional(),
    }),
  }),
};

export default buildValidationMiddleware(getGetDeclarationsValidator);
