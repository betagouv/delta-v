import type { Response, NextFunction, Request } from 'express';
import { HttpStatuses } from '../../../core/httpStatuses';

import { AppDataSource } from '../../../loader/database';
import { SearchProductHistoryRepository } from '../../../repositories/searchProductHistory.repository';
import { service } from './service';
import { serializer } from './serializer';

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { userId } = req.jwt;

    const searchProductHistory = await service({
      userId,
      searchProductHistoryRepository: AppDataSource.manager.withRepository(
        SearchProductHistoryRepository,
      ),
    });

    const response = serializer(searchProductHistory);

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
