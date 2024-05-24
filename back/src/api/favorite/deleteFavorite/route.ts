import type { Response, NextFunction } from 'express';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';
import { AppDataSource } from '../../../loader/database';
import { FavoriteRepository } from '../../../repositories/favorite.repository';
import { serializeDeleteFavorite } from './serializer';
import { service } from './service';

import { DeleteFavoriteRequest } from './validator';

type PutDeclaration = ValidatedRequest<DeleteFavoriteRequest>;

export default async (
  req: PutDeclaration,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { productId } = req.params;

    const { userId } = req.jwt;

    await service({
      userId,
      productId,
      favoriteRepository: AppDataSource.manager.withRepository(FavoriteRepository),
    });

    const response = serializeDeleteFavorite();

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
