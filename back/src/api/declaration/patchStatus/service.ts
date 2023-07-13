import { DeclarationStatus } from '../../../entities/declaration.entity';
import { DeclarationRepositoryInterface } from '../../../repositories/declaration.repository';
import { ProductRepositoryInterface } from '../../../repositories/product.repository';
import declarationNotFoundError from '../../common/errors/declarationNotFound.error';
import { checkCustomProducts } from './services/checkCustomProduct.service';
import { checkStatusChange } from './services/checkStatusChange.service';

export interface PatchStatusServiceOptions {
  status: DeclarationStatus;
  declarationId: string;
  declarationRepository: DeclarationRepositoryInterface;
  productRepository: ProductRepositoryInterface;
}

export const service = async ({
  status,
  declarationId,
  declarationRepository,
  productRepository,
}: PatchStatusServiceOptions): Promise<void> => {
  const declaration = await declarationRepository.getOne(declarationId);
  if (!declaration) {
    throw declarationNotFoundError();
  }

  checkStatusChange({ initialStatus: declaration.status, newStatus: status });
  await checkCustomProducts({
    declaration,
    newStatus: status,
    productRepository,
  });

  await declarationRepository.updateOne(declarationId, {
    status,
  });
};
