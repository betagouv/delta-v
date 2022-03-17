import { Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import { HttpStatuses } from '../../core/httpStatuses';
import { ValidatedRequest } from '../../core/utils/validatedExpressRequest';
import ProductRepository from '../../repositories/product.repository';
import { service } from './service';
import { SimulateRequest } from './validator';

type SimulateRequestType = ValidatedRequest<SimulateRequest>;

export default async (
  req: SimulateRequestType,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { shopingProducts, border, adult, meanOfTransport } = req.body;
    const response = await service({
      shopingProducts,
      border,
      adult,
      meanOfTransport,
      productRepository: getCustomRepository(ProductRepository),
    });

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
