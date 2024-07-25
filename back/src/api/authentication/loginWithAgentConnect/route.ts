import { NextFunction, Response } from 'express';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';
import { agentConnectService } from '../../../core/agentConnect/client';

import { HttpStatuses } from '../../../core/httpStatuses';
import { AppDataSource } from '../../../loader/database';
import { UserRepository } from '../../../repositories/user.repository';
import { IAuthenticateRequest } from './validator';
import serializer from './serializer';

import { service } from './service';

type AuthenticateRequest = ValidatedRequest<IAuthenticateRequest>;

export default async (
  req: AuthenticateRequest,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { code } = req.body;
    const user = service({
      code,
      agentConnectService,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
    });

    const response = serializer(user);

    return res.status(HttpStatuses.OK).send(response);
  } catch (error) {
    return next(error);
  }
};
