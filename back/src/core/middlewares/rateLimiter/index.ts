import type { RequestHandler } from 'express';
import { config } from '../../../loader/config';
import { defaultLimiter } from './defaultLimiter';
import {
  sendEmailResetPasswordLimiter,
  resendEmailValidationEmailLimiter,
} from './resendEmailLimiter';

export { IAuthObject } from '../../jwt/AuthObject';

export interface RateLimiterMiddlewareOptions {
  type?: RateLimiterType;
}

export enum RateLimiterType {
  DEFAULT = 'default',
  EMAIL_VALIDATION = 'email-validation',
  EMAIL_RESET_PASSWORD = 'email-reset-password',
}

export const rateLimiterMiddleware = ({
  type = RateLimiterType.DEFAULT,
}: RateLimiterMiddlewareOptions): RequestHandler => {
  if (config.DISABLE_RATE_LIMIT) {
    return (req, res, next) => next();
  }

  switch (type) {
    case RateLimiterType.EMAIL_VALIDATION:
      return resendEmailValidationEmailLimiter;
    case RateLimiterType.EMAIL_RESET_PASSWORD:
      return sendEmailResetPasswordLimiter;
    case RateLimiterType.DEFAULT:
      return defaultLimiter;
    default:
      return (req, res, next) => next();
  }
};
