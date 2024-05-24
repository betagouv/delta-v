import type { Response, NextFunction } from 'express';

import { HttpStatuses } from '../../../core/httpStatuses';
import { UserRepository } from '../../../repositories/user.repository';
import { AppDataSource } from '../../../loader/database';
import { eventEmitter } from '../../../core/eventManager/eventManager';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';
import serializer from './serializer';
import service from './service';
import { AskEmailValidationRequest } from './validator';

type AskEmailValidation = ValidatedRequest<AskEmailValidationRequest>;

export default async (
  req: AskEmailValidation,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const jwtEmail = req.jwt?.email;
    const bodyEmail = req.body?.email;

    await service({
      email: bodyEmail ?? jwtEmail,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
      eventEmitter,
    });

    const response = serializer();

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
