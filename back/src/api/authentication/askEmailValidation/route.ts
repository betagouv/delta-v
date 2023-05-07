import { Response, Request, NextFunction } from 'express';

import { HttpStatuses } from '../../../core/httpStatuses';
import { connectAndSendEmail } from '../../../core/mailer';
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
    const { logger } = req;

    await service({
      userId,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
      mailer: connectAndSendEmail,
      eventEmitter,
      logger,
    });

    const response = serializer();

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
