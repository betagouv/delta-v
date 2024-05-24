import type { Response, NextFunction } from 'express';

import { HttpStatuses } from '../../../core/httpStatuses';
import { UserRepository } from '../../../repositories/user.repository';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';
import { AppDataSource } from '../../../loader/database';
import serializer from './serializer';
import service from './service';
import { IValidateEmailRequest } from './validator';

type ValidateEmailRequest = ValidatedRequest<IValidateEmailRequest>;

export default async (
  req: ValidateEmailRequest,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { token } = req.body;

    await service({
      token,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
    });

    const response = serializer();

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
