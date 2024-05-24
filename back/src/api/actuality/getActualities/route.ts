import type { NextFunction, Response } from 'express';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';
import { AppDataSource } from '../../../loader/database';
import { ActualityRepository } from '../../../repositories/actuality.repository';
import service from './service';
import serializer from './serializer';
import { IGetActualitiesRequest } from './validator';

type GetActualitiesRequest = ValidatedRequest<IGetActualitiesRequest>;

export default async (
  req: GetActualitiesRequest,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { limit, offset, search, tags, startDate, endDate } = req.query;

    const actualities = await service({
      limit,
      offset,
      search,
      tags,
      startDate,
      endDate,
      actualityRepository: AppDataSource.manager.withRepository(ActualityRepository),
    });

    const response = serializer(actualities);

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
