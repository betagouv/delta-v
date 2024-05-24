import type { Response, NextFunction } from 'express';

import { HttpStatuses } from '../../../core/httpStatuses';
import { UserRepository } from '../../../repositories/user.repository';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';
import { AppDataSource } from '../../../loader/database';
import { eventEmitter } from '../../../core/eventManager/eventManager';
import serializer from './serializer';
import service from './service';
import { IRegisterRequest } from './validator';

type RegisterRequest = ValidatedRequest<IRegisterRequest>;

export default async (
  req: RegisterRequest,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { email, password } = req.body;

    await service({
      email,
      password,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
      eventEmitter,
    });

    const response = serializer();

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
