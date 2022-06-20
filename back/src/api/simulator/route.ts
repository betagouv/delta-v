import { Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import { HttpStatuses } from '../../core/httpStatuses';
import { ValidatedRequest } from '../../core/utils/validatedExpressRequest';
import ProductRepository from '../../repositories/product.repository';
import { serializeSimulator } from './serializer';
import { service } from './service';
import { SimulateRequest } from './validator';

type SimulateRequestType = ValidatedRequest<SimulateRequest>;

export default async (
  req: SimulateRequestType,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { shoppingProducts, border, age, country, meanOfTransport } = req.body;
    const { products, franchiseAmount } = await service({
      shoppingProducts,
      border,
      age,
      country,
      meanOfTransport,
      productRepository: getCustomRepository(ProductRepository),
    });

    const response = serializeSimulator({ products, franchiseAmount });

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
