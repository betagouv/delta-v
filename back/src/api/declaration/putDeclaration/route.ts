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
      authorType,
      meanOfTransport,
      declarantPhoneNumber,
      declarantAddressStreet,
      declarantAddressPostalCode,
      declarantAddressCity,
      declarantEmail,
      declarantFirstName,
      declarantLastName,
    } = req.body;

    const { email: authorEmail, userId: authorId } = req.jwt;

    await service({
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
      authorType,
      declarantAddressStreet,
      declarantAddressPostalCode,
      declarantAddressCity,
      declarantEmail,
      declarantPhoneNumber,
      declarantFirstName,
      declarantLastName,
    });

    const response = serializeSimulator();

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
