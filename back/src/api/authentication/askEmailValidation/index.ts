import { Router } from 'express';

import { jwtMiddleware } from '../../../core/middlewares/jwt.middleware';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';
import { RateLimiterType, rateLimiterMiddleware } from '../../../core/middlewares/rateLimiter';
import route from './route';

export const askEmailValidation = Router().post(
  '/email/validate/ask',
  rateLimiterMiddleware({ type: RateLimiterType.EMAIL_VALIDATION }),
  jwtMiddleware({ isOptional: true }),
  validatedExpressRequest(route),
);
