import { HttpStatuses } from './httpStatuses';

export interface IAppError extends Error {
  statusCode: HttpStatuses;
  message: string;
  publicMessage: string;
  code?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context?: any;
  report: boolean;
  isAppError: boolean;
  silent: boolean;
}

export interface IAppErrorOptions {
  statusCode?: HttpStatuses;
  message: string;
  publicMessage: string;
  code?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context?: any;
  report?: boolean;
  silent?: boolean;
}

class AppError extends Error implements IAppError {
  public message: string;
  public statusCode: HttpStatuses;
  publicMessage: string;
  public code?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public context?: any;
  public report: boolean;
  public isAppError = true;
  public silent: boolean;

  constructor({
    statusCode,
    code,
    message,
    publicMessage,
    context,
    report,
    silent,
  }: IAppErrorOptions) {
    super(message);
    this.statusCode = statusCode ?? HttpStatuses.INTERNAL_SERVER_ERROR;
    this.message = message;
    this.publicMessage = publicMessage;
    this.context = context;
    this.code = code;
    this.report = report ?? false;
    this.silent = silent ?? false;
  }
}

/**
 * AppError builder function
 * @param args Error arguments
 */
export function buildError(args: IAppErrorOptions): IAppError {
  return new AppError(args);
}
