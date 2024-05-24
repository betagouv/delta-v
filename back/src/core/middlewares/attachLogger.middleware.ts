import type { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import pinoHttp from 'pino-http';
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

  const pinoMiddleware = pinoHttp({
    logger: logger.pinoLogger,
  });

  pinoMiddleware(req, res, next);
};

/**
 * Middleware witch attaches logger into request object.
 */
export const attachLoggerMiddleware = function attachLoggerMiddlewareFn(): Router {
  return Router().use(logMiddleware);
};
