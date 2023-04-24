import { Response, NextFunction } from 'express';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';
import { CurrencyRepository } from '../../../repositories/currency.repository';
import { DeclarationRepository } from '../../../repositories/declaration.repository';
import { ProductRepository } from '../../../repositories/product.repository';
import { AppDataSource } from '../../../loader/database';
import { serializeSimulator } from './serializer';
import { service } from './service';
import { PutDeclarationRequest } from './validator';

type PutDeclaration = ValidatedRequest<PutDeclarationRequest>;

export default async (
  req: PutDeclaration,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { declarationId } = req.params;
    const {
      shoppingProducts,
      border,
      age,
      country,
      meanOfTransport,
      authorEmail,
      authorId,
      authorFullName,
      authorType,
      declarantAddress,
      declarantEmail,
      declarantFirstName,
      declarantLastName,
    } = req.body;

    const declaration = await service({
      declarationId,
      shoppingProducts,
      border,
      age,
      country,
      meanOfTransport,
      productRepository: AppDataSource.manager.withRepository(ProductRepository),
      currencyRepository: AppDataSource.manager.withRepository(CurrencyRepository),
      declarationRepository: AppDataSource.manager.withRepository(DeclarationRepository),
      authorEmail,
      authorId,
      authorFullName,
      authorType,
      declarantAddress,
      declarantEmail,
      declarantFirstName,
      declarantLastName,
    });

    const response = serializeSimulator(declaration);

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
