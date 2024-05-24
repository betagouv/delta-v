import type { NextFunction, Response } from 'express';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';
import { AppDataSource } from '../../../loader/database';
import { DeclarationRepository } from '../../../repositories/declaration.repository';
import service from './service';
import serializer from './serializer';
import { IGetDeclarationsRequest } from './validator';

type GetDeclarationsRequest = ValidatedRequest<IGetDeclarationsRequest>;

export default async (
  req: GetDeclarationsRequest,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { limit, offset, search, searchPublicId, status, meanOfTransports, startDate, endDate } =
      req.query;

    const declarations = await service({
      limit,
      offset,
      search,
      searchPublicId,
      status,
      meanOfTransports,
      startDate,
      endDate,
      declarationRepository: AppDataSource.manager.withRepository(DeclarationRepository),
    });

    const response = serializer(declarations);

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
