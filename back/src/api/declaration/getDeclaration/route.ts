import { Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';
import DeclarationRepository from '../../../repositories/declaration.repository';

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
      declarationRepository: getCustomRepository(DeclarationRepository),
    });

    const response = serializer(declaration);

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
