import type { Response, NextFunction, Request } from 'express';
import { HttpStatuses } from '../../../core/httpStatuses';
import { CurrencyRepository } from '../../../repositories/currency.repository';
import { AppDataSource } from '../../../loader/database';
import { serializer } from './serializer';
import { service } from './service';

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const currencies = await service({
      currencyRepository: AppDataSource.manager.withRepository(CurrencyRepository),
    });

    const response = serializer(currencies);

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
