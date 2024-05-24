import type { Response, NextFunction } from 'express';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';
import { AppDataSource } from '../../../loader/database';
import { UserRepository } from '../../../repositories/user.repository';
import { ConfigRepository } from '../../../repositories/config.repository';
import { serializePutDefaultCountry } from './serializer';
import { service } from './service';

import { PutDefaultCountryRequest } from './validator';

type PutDefaultCountry = ValidatedRequest<PutDefaultCountryRequest>;

export default async (
  req: PutDefaultCountry,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { country } = req.body;

    const { userId } = req.jwt;

    await service({
      userId,
      country,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
      configRepository: AppDataSource.manager.withRepository(ConfigRepository),
    });

    const response = serializePutDefaultCountry();

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
