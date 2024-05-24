import type { Response, NextFunction } from 'express';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';

import { DeclarationRepository } from '../../../repositories/declaration.repository';
import { AppDataSource } from '../../../loader/database';
import { ProductRepository } from '../../../repositories/product.repository';
import serializer from './serializer';
import { service } from './service';
import { PatchStatusRequest } from './validator';

type PatchStatus = ValidatedRequest<PatchStatusRequest>;

export default async (
  req: PatchStatus,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { declarationId } = req.params;
    const { status } = req.body;

    await service({
      declarationId,
      status,
      declarationRepository: AppDataSource.manager.withRepository(DeclarationRepository),
      productRepository: AppDataSource.manager.withRepository(ProductRepository),
    });

    const response = serializer();

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
