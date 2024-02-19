import { rateLimit, Options } from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import { HttpStatuses } from '../../httpStatuses';
import { ErrorCodes } from '../../../api/common/enums/errorCodes.enum';
import { getRedisConnection } from '../../../loader/redis';

const client = getRedisConnection();

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
  store: new RedisStore({
    // @ts-expect-error - Known issue: the `call` function is not present in @types/ioredis
    sendCommand: (...args: string[]) => client.call(...args),
  }),
};

export const defaultLimiter = rateLimit(defaultLimiterOptions);
