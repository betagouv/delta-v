import { Response, NextFunction } from 'express';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';

import { DeclarationRepository } from '../../../repositories/declaration.repository';
import { AppDataSource } from '../../../loader/database';
import serializer from './serializer';
import service from './service';
import { IGetOneDeclarationWithPublicId } from './validator';

type GetOneDeclarationWithPublicId = ValidatedRequest<IGetOneDeclarationWithPublicId>;

export default async (
  req: GetOneDeclarationWithPublicId,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { publicDeclarationId } = req.params;

    const declaration = await service({
      publicDeclarationId,
      declarationRepository: AppDataSource.manager.withRepository(DeclarationRepository),
    });

    const response = serializer(declaration);

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
