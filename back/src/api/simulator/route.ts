import { Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import { HttpStatuses } from '../../core/httpStatuses';
import { ValidatedRequest } from '../../core/utils/validatedExpressRequest';
import CurrencyRepository from '../../repositories/currency.repository';
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

    const { valueProducts, amountProducts, franchiseAmount } = await service({
      shoppingProducts,
      border,
      age,
      country,
      meanOfTransport,
      productRepository: getCustomRepository(ProductRepository),
      currencyRepository: getCustomRepository(CurrencyRepository),
    });

    const response = serializeSimulator({ valueProducts, franchiseAmount, amountProducts });

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
