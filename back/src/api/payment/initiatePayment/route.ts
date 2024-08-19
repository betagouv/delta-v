import { Response, NextFunction } from 'express';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';
import { AppDataSource } from '../../../loader/database';
import { DeclarationRepository } from '../../../repositories/declaration.repository';
import { service } from './service';
import { PaymentRequest } from './validator';

type PaymentRequestType = ValidatedRequest<PaymentRequest>;

export default async (
  req: PaymentRequestType,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { declarationId } = req.body;

    const response = await service({
      declarationId,
      declarationRepository: AppDataSource.manager.withRepository(DeclarationRepository),
    });

    return res.status(HttpStatuses.OK).send(response);
  } catch (error) {
    return next(error);
  }
};
