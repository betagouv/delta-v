import type { Response, NextFunction } from 'express';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';
import { CurrencyRepository } from '../../../repositories/currency.repository';
import { ProductRepository } from '../../../repositories/product.repository';
import { AppDataSource } from '../../../loader/database';
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

    const responseService = await service({
      shoppingProducts,
      border,
      age,
      country,
      meanOfTransport,
      productRepository: AppDataSource.manager.withRepository(ProductRepository),
      currencyRepository: AppDataSource.manager.withRepository(CurrencyRepository),
    });

    const response = serializeSimulator(responseService);

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
