/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Request, RequestHandler } from 'express';
export type ValidatedRequest<RequestTypes> = Omit<Request, 'params' | 'body' | 'query'> &
  RequestTypes;

export type RequestHandlerWithCustomRequestType = (
  ...params: Parameters<RequestHandler<any, any, any, any>>
) => any;

type ValidatedExpressRequest = (route: RequestHandlerWithCustomRequestType) => any;

export const validatedExpressRequest: ValidatedExpressRequest = (
  route: RequestHandlerWithCustomRequestType,
): RequestHandlerWithCustomRequestType =>
  function requestHandler(req, res, next): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return route(req, res, next);
  };
