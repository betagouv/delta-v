import type { Response, NextFunction } from 'express';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';

import { AppDataSource } from '../../../loader/database';
import { ProductRepository } from '../../../repositories/product.repository';
import { UserRepository } from '../../../repositories/user.repository';
import { SearchProductHistoryRepository } from '../../../repositories/searchProductHistory.repository';
import serializer from './serializer';
import { service } from './service';
import { PutSearchProductHistoryRequest } from './validator';

type PutSearchProductHistory = ValidatedRequest<PutSearchProductHistoryRequest>;

export default async (
  req: PutSearchProductHistory,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { productId, searchValue } = req.body;
    const { userId } = req.jwt;

    await service({
      productId,
      searchValue,
      userId,
      productRepository: AppDataSource.manager.withRepository(ProductRepository),
      userRepository: AppDataSource.manager.withRepository(UserRepository),
      searchProductHistoryRepository: AppDataSource.manager.withRepository(
        SearchProductHistoryRepository,
      ),
    });

    const response = serializer();

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
