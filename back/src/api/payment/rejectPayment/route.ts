import { Response, NextFunction } from 'express';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';
import { AppDataSource } from '../../../loader/database';
import { DeclarationRepository } from '../../../repositories/declaration.repository';
import { service } from './service';
import { RejectPaymentRequest } from './validator';

type RejectPaymentRequestType = ValidatedRequest<RejectPaymentRequest>;

export default async (
  req: RejectPaymentRequestType,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { declarationId } = req.body;

    await service({
      declarationId,
      declarationRepository: AppDataSource.manager.withRepository(DeclarationRepository),
    });

    return res.status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
