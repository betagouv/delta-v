import type { Request, Response, NextFunction } from 'express';
import { HttpStatuses } from '../../../core/httpStatuses';
import { AppDataSource } from '../../../loader/database';
import { UserRepository } from '../../../repositories/user.repository';
import { ConfigRepository } from '../../../repositories/config.repository';
import serializer from './serializer';
import { service } from './service';

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { userId } = req.jwt;

    const config = await service({
      userId,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
      configRepository: AppDataSource.manager.withRepository(ConfigRepository),
    });

    const response = config && serializer(config);

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
