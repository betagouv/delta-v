import { Response, Request, NextFunction } from 'express';

import { HttpStatuses } from '../../../core/httpStatuses';
import { UserRepository } from '../../../repositories/user.repository';
import { AppDataSource } from '../../../loader/database';
import { eventEmitter } from '../../../core/eventManager/eventManager';
import serializer from './serializer';
import service from './service';

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { userId } = req.jwt;

    await service({
      userId,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
      eventEmitter,
    });

    const response = serializer();

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
