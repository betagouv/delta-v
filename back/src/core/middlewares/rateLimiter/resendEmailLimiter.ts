import { Request } from 'express';
import { rateLimit, Options } from 'express-rate-limit';
import { HttpStatuses } from '../../httpStatuses';
import { ErrorCodes } from '../../../api/common/enums/errorCodes.enum';

const getEmailFromBody = (req: Request): string | undefined => {
  if (req.body.email) {
    return req.body.email;
  }
  return undefined;
};

const resendEmailLimiterOptions: Partial<Options> = {
  windowMs: 60 * 1000,
  max: 1,
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: true,
  keyGenerator: (req) => {
    return getEmailFromBody(req) || req.ip;
  },
  handler: (req, res) => {
    res.status(HttpStatuses.TOO_MANY_REQUESTS).json({
      message:
        "Un email vous a été envoyé il y a moins d'une minute, vérifiez votre boite mail ou rééssayez plus tard.",
      code: ErrorCodes.TOO_MANY_REQUESTS_EMAIL_SEND,
    });
  },
};

export const sendEmailResetPasswordLimiter = rateLimit(resendEmailLimiterOptions);
export const resendEmailValidationEmailLimiter = rateLimit(resendEmailLimiterOptions);
