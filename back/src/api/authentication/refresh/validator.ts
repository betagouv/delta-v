import { buildValidationMiddleware } from '../../../core/middlewares';
import { validator } from '../../../core/validator';
import { jwtTokenRegex } from '../common/const/regex';

export interface IRefreshRequest {
  body: {
    accessToken: string;
    refreshToken: string;
  };
}

export const refreshValidator = {
  body: validator.object({
    accessToken: validator.string().regex(jwtTokenRegex).required(),
    refreshToken: validator.string().regex(jwtTokenRegex).required(),
  }),
};

export default buildValidationMiddleware(refreshValidator);
