import type { Response, NextFunction, Request } from 'express';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ProductRepository } from '../../../repositories/product.repository';
import { AppDataSource } from '../../../loader/database';
import { serializer } from './serializer';
import { service } from './service';

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const products = await service({
      productRepository: AppDataSource.manager.withRepository(ProductRepository),
    });

    const response = serializer(products);

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
