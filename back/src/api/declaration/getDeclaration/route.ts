import type { Response, NextFunction } from 'express';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';

import { DeclarationRepository } from '../../../repositories/declaration.repository';
import { AppDataSource } from '../../../loader/database';
import serializer from './serializer';
import service from './service';
import { IGetOneDeclaration } from './validator';

type GetOneDeclaration = ValidatedRequest<IGetOneDeclaration>;

export default async (
  req: GetOneDeclaration,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { declarationId } = req.params;

    const declaration = await service({
      declarationId,
      declarationRepository: AppDataSource.manager.withRepository(DeclarationRepository),
    });

    const response = serializer(declaration);

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
