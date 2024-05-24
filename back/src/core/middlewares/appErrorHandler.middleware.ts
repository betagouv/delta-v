import type { Response, NextFunction } from 'express';
import { HttpStatuses } from '../httpStatuses';
import { IAppError } from '../buildError';
import { RequestWithLogger } from './attachLogger.middleware';

/**
 * Error handling middleware. It catches AppError and parses it into proper format.
 */
export function appErrorHandlerMiddleware(
  error: IAppError,
  req: RequestWithLogger,
  res: Response,
  next: NextFunction,
): Response | void {
  // Handle SyntaxError when sending improper json body
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((error as any).type && (error as any).type === 'entity.parse.failed') {
    req.logger.warn({ message: 'Improper body JSON payload' });

    return res.status(HttpStatuses.BAD_REQUEST).send({
      message: 'Improper body JSON payload',
      statusCode: HttpStatuses.BAD_REQUEST,
      code: 'bad-body-json',
    });
  }

  const shouldReportError =
    !error.silent && (!error.isAppError || error.report || error.statusCode >= 500);

  if (shouldReportError) {
    req.logger.error({
      error,
      context: error.isAppError
        ? {
            message: error.message,
            statusCode: error.statusCode,
            code: error.code,
            publicMessage: error.publicMessage,
            context: error.context,
          }
        : undefined,
    });
  }

  if (error.isAppError) {
    const { statusCode, publicMessage, code, context, message } = error;

    req.logger.warn({
      message: 'Request finished with AppError',
      context: { message, statusCode, code, error },
    });

    return res.status(statusCode).send({
      message: publicMessage,
      code,
      context,
      statusCode,
    });
  }

  if (process.env.NODE_ENV === 'production') {
    return res.status(HttpStatuses.INTERNAL_SERVER_ERROR).send({
      message: 'Internal server error',
      statusCode: HttpStatuses.INTERNAL_SERVER_ERROR,
    });
  }

  next(error);
}
