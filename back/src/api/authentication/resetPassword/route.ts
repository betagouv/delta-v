import type { Response, NextFunction } from 'express';

import { HttpStatuses } from '../../../core/httpStatuses';
import { UserRepository } from '../../../repositories/user.repository';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';
import { AppDataSource } from '../../../loader/database';
import serializer from './serializer';
import service from './service';
import { IResetPasswordRequest } from './validator';

type ResetPasswordRequest = ValidatedRequest<IResetPasswordRequest>;

export default async (
  req: ResetPasswordRequest,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { token, password } = req.body;

    await service({
      token,
      password,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
    });

    const response = serializer();

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
