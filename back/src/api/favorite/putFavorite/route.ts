import type { Response, NextFunction } from 'express';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';
import { AppDataSource } from '../../../loader/database';
import { FavoriteRepository } from '../../../repositories/favorite.repository';
import { serializePutFavorite } from './serializer';
import { service } from './service';

import { PutFavoriteRequest } from './validator';

type PutDeclaration = ValidatedRequest<PutFavoriteRequest>;

export default async (
  req: PutDeclaration,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { productId, name } = req.body;

    const { userId } = req.jwt;

    await service({
      userId,
      productId,
      name,
      favoriteRepository: AppDataSource.manager.withRepository(FavoriteRepository),
    });

    const response = serializePutFavorite();

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
