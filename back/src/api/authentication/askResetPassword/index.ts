import { Router } from 'express';

import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';
import { RateLimiterType, rateLimiterMiddleware } from '../../../core/middlewares/rateLimiter';
import route from './route';
import validationMiddleware from './validator';

export const askResetPassword = Router().post(
  '/password/ask',
  rateLimiterMiddleware({ type: RateLimiterType.EMAIL_RESET_PASSWORD }),
  validationMiddleware,
  validatedExpressRequest(route),
);
