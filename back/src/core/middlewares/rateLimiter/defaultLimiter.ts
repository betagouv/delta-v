import { rateLimit, Options } from 'express-rate-limit';
import { HttpStatuses } from '../../httpStatuses';
import { ErrorCodes } from '../../../api/common/enums/errorCodes.enum';

export const defaultLimiterOptions: Partial<Options> = {
  windowMs: 10 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  handler: (req, res) => {
    res.status(HttpStatuses.TOO_MANY_REQUESTS).json({
      message: 'Trop de requêtes, veuillez rééssayer plus tard',
      code: ErrorCodes.TOO_MANY_REQUESTS,
    });
  },
};

export const defaultLimiter = rateLimit(defaultLimiterOptions);
