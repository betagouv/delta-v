import type { Request, Response, NextFunction, RequestHandler } from 'express';

import { IAuthObject } from '../jwt/AuthObject';
import { buildAccessTokenObject, checkAndReturnAuthAccessToken } from '../jwt/verifyToken';
import invalidTokenError from '../../api/common/errors/invalidToken.error';

export { IAuthObject } from '../jwt/AuthObject';

export interface RequestWithJwt extends Request {
  jwt: IAuthObject;
}

export interface IJwtMiddlewareOptions {
  isOptional?: boolean;
  isAgent?: boolean;
}

export const jwtMiddleware =
  ({ isOptional = false, isAgent = false }: IJwtMiddlewareOptions): RequestHandler =>
  async (req: RequestWithJwt, res: Response, next: NextFunction): Promise<void | Response> => {
    if (isOptional && !req.headers.authorization) {
      return next();
    }
    try {
      const accessToken = checkAndReturnAuthAccessToken(req.headers.authorization);

      const authObject = await buildAccessTokenObject(accessToken);

      if (isAgent && !authObject.isAgent) {
        throw invalidTokenError();
      }

      req.jwt = authObject;

      return next();
    } catch (error) {
      next(error);
    }
  };
