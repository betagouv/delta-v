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
    accessToken: validator.string().regex(jwtTokenRegex).required().messages({
      'string.empty': "L'access token est requis",
      'string.pattern.base': "L'access token ne respecte pas le bon format",
    }),
    refreshToken: validator.string().regex(jwtTokenRegex).required().messages({
      'string.empty': 'Le refresh token est requis',
      'string.pattern.base': 'Le refresh token ne respecte pas le bon format',
    }),
  }),
};

export default buildValidationMiddleware(refreshValidator);
