import redact from 'redact-object';
import pino from 'pino';
import type { Request } from 'express';

const DEFAULT_LOG_LEVEL = 'info';

const SECRET_FIELDS = [
  'authorization',
  'x-access-token',
  'x-refresh-token',
  'password',
  'refreshToken',
  'number',
  'expiration',
  'cvc',
];

export interface ILogData {
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context?: any;
  silent?: boolean;
}

export interface ILogErrorData {
  message?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context?: { [key: string]: any };
  error: Error;
}

// There is a copy of those interfaces in adn-database.
// Has to be updated in both places.
export interface ILogger {
  debug: (data: ILogData) => void;
  error(error: Error): void;
  error(data: ILogErrorData): void;
  info: (data: ILogData) => void;
  trace: (data: ILogData) => void;
  warn: (data: ILogData) => void;
}

const parseLogErrorData = (input: Error | ILogErrorData): ILogErrorData =>
  input instanceof Error ? { error: input, context: undefined } : input;

const isProduction = process.env.NODE_ENV === 'production';
const silentLog = (silent = false): boolean => silent && isProduction;

/**
 * App logger. Based on pino and wired with sentry.
 */
export class Logger implements ILogger {
  public pinoLogger: any;

  private request: Request;

  constructor() {
    this.pinoLogger = pino({
      level: process.env.LOG_LEVEL || DEFAULT_LOG_LEVEL,
      transport: !isProduction
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
            },
          }
        : undefined,
    });
  }

  attachRequest(req: Request): void {
    this.request = req;
  }

  debug({ message, context, silent }: ILogData): void {
    if (!silentLog(silent)) {
      this.pinoLogger.debug(this.buildContext(context), message);
    }
  }

  error(opt: Error | ILogErrorData): void {
    const { error, context, message } = parseLogErrorData(opt);

    this.pinoLogger.error({ ...this.buildContext(context), err: error }, message || error.message);
  }

  info({ message, context, silent }: ILogData): void {
    if (!silentLog(silent)) {
      this.pinoLogger.info(this.buildContext(context), message);
    }
  }

  trace({ message, context, silent }: ILogData): void {
    if (!silentLog(silent)) {
      this.pinoLogger.trace(this.buildContext(context), message);
    }
  }

  warn({ message, context, silent }: ILogData): void {
    if (!silentLog(silent)) {
      this.pinoLogger.warn(this.buildContext(context), message);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private buildContext(context: any): any {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return {
      ...this.redact(context),
      requestID: this.request ? this.request.header('requestid') : undefined,
      // userID: this.request?.jwt?.userId,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private redact(data: unknown): any {
    try {
      return redact(data, SECRET_FIELDS, '[Redacted]');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.message === 'Unsupported value for redaction') {
        return data;
      }

      throw error;
    }
  }
}
