import { NextFunction, Response } from 'express';
import { ValidatedRequest } from '../../../../core/utils/validatedExpressRequest';
import { HttpStatuses } from '../../../../core/httpStatuses';
import { getRedisConnection } from '../../../../loader/redis';
import { ILogoutCallbackRequest } from './validator';
import { service } from './service';

type LogoutCallbackRequest = ValidatedRequest<ILogoutCallbackRequest>;

export default async (
  req: LogoutCallbackRequest,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { state } = req.body;
    const storedState = req.session?.logoutState;

    if (!state || state !== storedState) {
      throw new Error('Invalid state parameter');
    }

    const redisClient = getRedisConnection();

    await service({
      req,
      redisClient,
    });

    return res.status(HttpStatuses.OK).send({ message: 'Logout successful' });
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid state parameter') {
      return res.status(HttpStatuses.BAD_REQUEST).send({ error: 'Invalid logout request' });
    }
    return next(error);
  }
};
