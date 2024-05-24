import type { Request } from 'express';
import { rateLimit, Options } from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { HttpStatuses } from '../../httpStatuses';
import { ErrorCodes } from '../../../api/common/enums/errorCodes.enum';
import { getRedisConnection } from '../../../loader/redis';

const client = getRedisConnection();

const getEmailFromBody = (req: Request): string | undefined => {
  if (req.body.email) {
    return req.body.email;
  }
  return undefined;
};

const getIp = (req: Request): string => {
  if (req.ip) {
    return req.ip;
  }
  throw new Error('No ip found in request');
};

const resendEmailLimiterOptions: Partial<Options> = {
  windowMs: 60 * 1000,
  max: 1,
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: true,
  keyGenerator: (req) => {
    return getEmailFromBody(req) || getIp(req);
  },
  handler: (req, res) => {
    res.status(HttpStatuses.TOO_MANY_REQUESTS).json({
      message:
        "Un email vous a été envoyé il y a moins d'une minute, vérifiez votre boite mail ou rééssayez plus tard.",
      code: ErrorCodes.TOO_MANY_REQUESTS_EMAIL_SEND,
    });
  },
  store: new RedisStore({
    // @ts-expect-error - Known issue: the `call` function is not present in @types/ioredis
    sendCommand: (...args: string[]) => client.call(...args),
  }),
};

export const sendEmailResetPasswordLimiter = rateLimit(resendEmailLimiterOptions);
export const resendEmailValidationEmailLimiter = rateLimit(resendEmailLimiterOptions);
