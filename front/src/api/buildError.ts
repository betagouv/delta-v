import { HttpStatuses } from './httpStatuses';

export interface AppError extends Error {
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

export interface UseMutationError extends Error {
  response: {
    config: any;
    data: AppError;
    headers: any;
    request: any;
    status: number;
    statusText: string;
  };
}
