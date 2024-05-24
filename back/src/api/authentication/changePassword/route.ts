import type { Response, NextFunction } from 'express';

import { HttpStatuses } from '../../../core/httpStatuses';
import { UserRepository } from '../../../repositories/user.repository';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';
import { AppDataSource } from '../../../loader/database';
import serializer from './serializer';
import service from './service';
import { IChangePasswordRequest } from './validator';

type ChangePasswordRequest = ValidatedRequest<IChangePasswordRequest>;

export default async (
  req: ChangePasswordRequest,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { userId } = req.jwt;

    await service({
      oldPassword,
      newPassword,
      userId,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
    });

    const response = serializer();

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
