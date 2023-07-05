import { buildValidationMiddleware } from '../../../core/middlewares';
import { validator } from '../../../core/validator';
import { validateNewsTags } from '../../../utils/joiCustomValidators';

export interface IGetActualitiesRequest {
  query: {
    limit: number;
    offset: number;
    search?: string;
    tags?: string;
    startDate?: Date;
    endDate?: Date;
  };
}

export const getActualitiesValidator = {
  query: validator.object({
    limit: validator.number().integer().default(10).min(1).max(100),
    offset: validator.number().integer().default(0).min(0),
    search: validator.string().optional().allow(''),
    tags: validator.string().custom(validateNewsTags).optional(),
    startDate: validator.date().optional(),
    endDate: validator.when('startDate', {
      is: validator.exist(),
      then: validator.date().min(validator.ref('startDate')).optional(),
      otherwise: validator.date().optional(),
    }),
  }),
};

export default buildValidationMiddleware(getActualitiesValidator);
