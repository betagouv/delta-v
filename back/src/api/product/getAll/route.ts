import { Response, NextFunction, Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { HttpStatuses } from '../../../core/httpStatuses';
import ProductRepository from '../../../repositories/product.repository';
import { serializer } from './serializer';
import { service } from './service';

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const products = await service({ productRepository: getCustomRepository(ProductRepository) });

    const response = serializer(products);

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
