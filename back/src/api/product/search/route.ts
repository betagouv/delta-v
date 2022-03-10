import { Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';
import ProductRepository from '../../../repositories/product.repository';
import { serializer } from './serializer';
import { service } from './service';
import { SearchProductsRequest } from './validator';

type SearchProductsRequestType = ValidatedRequest<SearchProductsRequest>;

export default async (
  req: SearchProductsRequestType,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const { search } = req.query;
  try {
    const products = await service({
      productRepository: getCustomRepository(ProductRepository),
      search,
    });

    const result = serializer(products);

    return res.send(result).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
