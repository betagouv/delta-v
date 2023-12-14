import { Response, NextFunction } from 'express';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';

import { AppDataSource } from '../../../loader/database';
import { UserRepository } from '../../../repositories/user.repository';
import { SearchProductHistoryRepository } from '../../../repositories/searchProductHistory.repository';
import { service } from './service';
import { serializer } from './serializer';

type GetSearchProductHistory = ValidatedRequest<object>;

export default async (
  req: GetSearchProductHistory,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { userId } = req.jwt;

    const searchProductHistory = await service({
      userId,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
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
