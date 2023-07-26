import { NextFunction, Response } from 'express';

import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';
import { AppDataSource } from '../../../loader/database';
import { UserRepository } from '../../../repositories/user.repository';
import { HttpStatuses } from '../../../core/httpStatuses';
import { eventEmitter } from '../../../core/eventManager/eventManager';
import { IUpdatePasswordRequest } from './validator';
import service from './service';
import serializer from './serializer';

type UpdatePasswordRequest = ValidatedRequest<IUpdatePasswordRequest>;

export default async (
  req: UpdatePasswordRequest,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { currentPassword, newPassword } = req.body;
    const { userId } = req.jwt;

    await service({
      userId,
      currentPassword,
      newPassword,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
      eventEmitter,
    });

    const response = serializer();

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
