import { Request, Response, NextFunction, Router } from 'express';
import expressPino from 'express-pino-logger';
import { ILogger, Logger } from '../logger';

export interface RequestWithLogger extends Request {
  logger: ILogger;
}

const isHealthCheck = (req: Pick<Request, 'path'>): boolean =>
  req.path.includes('/status/healthcheck');

const logMiddleware = (
  req: RequestWithLogger,
  res: Response,
  next: NextFunction,
): Response | void => {
  const logger = new Logger();
  req.logger = logger;
  logger.attachRequest(req);

  if (isHealthCheck(req)) {
    return next();
  }

  return next(expressPino({ logger: logger.pinoLogger })(req, res));
};

/**
 * Middleware witch attaches logger into request object.
 */
export const attachLoggerMiddleware = function attachLoggerMiddlewareFn(): Router {
  return Router().use(logMiddleware);
};
