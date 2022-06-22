import { Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';
import UserRepository from '../../../repositories/user.repository';
import { serializer } from './serializer';
import { service } from './service';
import { GetAverageRequest } from './validator';

type GetAverageRequestType = ValidatedRequest<GetAverageRequest>;

export default async (
  req: GetAverageRequestType,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const { id } = req.params;
  try {
    const { average, status } = await service({
      userId: id,
      userRepository: getCustomRepository(UserRepository),
    });

    const result = serializer(status, average);

    return res.send(result).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
