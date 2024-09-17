import { Response, NextFunction } from 'express';
import { HttpStatuses } from '../../../../core/httpStatuses';
import { ValidatedRequest } from '../../../../core/utils/validatedExpressRequest';
import { AppDataSource } from '../../../../loader/database';
import { UserRepository } from '../../../../repositories/user.repository';
import { getRedisConnection } from '../../../../loader/redis';
import { IRefreshRequest } from './validator';
import { service } from './service';

type RefreshRequest = ValidatedRequest<IRefreshRequest>;

export default async (
  req: RefreshRequest,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { accessToken, refreshToken, lastRefresh } = req.body;
    const redisClient = getRedisConnection(); // Get the Redis client

    const response = await service({
      accessToken,
      refreshToken,
      lastRefresh,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
      redisClient, // Pass the Redis client to the service
    });

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
