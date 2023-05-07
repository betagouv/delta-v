import { Request, Response, NextFunction, RequestHandler } from 'express';

import { IAuthObject } from '../jwt/AuthObject';
import { buildAccessTokenObject, checkAndReturnAuthAccessToken } from '../jwt/verifyToken';

export { IAuthObject } from '../jwt/AuthObject';

export interface RequestWithJwt extends Request {
  jwt: IAuthObject;
}

export interface IJwtMiddlewareOptions {
  isOptional?: boolean;
}

export const jwtMiddleware =
  (options?: IJwtMiddlewareOptions): RequestHandler =>
  async (req: RequestWithJwt, res: Response, next: NextFunction): Promise<void | Response> => {
    if (options?.isOptional && !req.headers.authorization) {
      return next();
    }
    try {
      const accessToken = checkAndReturnAuthAccessToken(req.headers.authorization);

      const authObject = await buildAccessTokenObject(accessToken);

      req.jwt = authObject;

      return next();
    } catch (error) {
      next(error);
    }
  };
