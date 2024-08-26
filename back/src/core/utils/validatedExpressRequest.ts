/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, RequestHandler, Response, NextFunction } from 'express';
import { Session } from 'express-session';

export interface CustomSession extends Session {
  idToken: string;
  state: string;
  nonce: string;
}

interface CustomRequest extends Request {
  session: CustomSession;
}

export type ValidatedRequest<RequestTypes> = Omit<CustomRequest, 'params' | 'body' | 'query'> &
  RequestTypes;

export type RequestHandlerWithCustomRequestType<T = any> = (
  req: ValidatedRequest<T>,
  res: Response,
  next: NextFunction,
) => any;

type ValidatedExpressRequest = <T>(route: RequestHandlerWithCustomRequestType<T>) => RequestHandler;

export const validatedExpressRequest: ValidatedExpressRequest = <T>(
  route: RequestHandlerWithCustomRequestType<T>,
): RequestHandler =>
  function requestHandler(req: Request, res, next): void {
    const customReq = req as unknown as ValidatedRequest<T>;
    return route(customReq, res, next);
  };
