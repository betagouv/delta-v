import type { NextFunction, Request, Response } from 'express';
import { HttpStatuses } from '../../../core/httpStatuses';
import { AppDataSource } from '../../../loader/database';
import { FavoriteRepository } from '../../../repositories/favorite.repository';
import { service } from './service';
import serializer from './serializer';

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { userId } = req.jwt;

    const favorites = await service({
      userId,
      favoriteRepository: AppDataSource.manager.withRepository(FavoriteRepository),
    });

    const response = serializer(favorites);

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
