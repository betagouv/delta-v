import { DeclarationStatus } from '../../../entities/declaration.entity';
import { DeclarationRepositoryInterface } from '../../../repositories/declaration.repository';
import declarationNotFoundError from '../../common/errors/declarationNotFound.error';
import { checkStatusChange } from './services/checkStatusChange.service';

export interface PatchStatusServiceOptions {
  status: DeclarationStatus;
  declarationId: string;
  declarationRepository: DeclarationRepositoryInterface;
}

export const service = async ({
  status,
  declarationId,
  declarationRepository,
}: PatchStatusServiceOptions): Promise<void> => {
  const declaration = await declarationRepository.getOne(declarationId);
  if (!declaration) {
    throw declarationNotFoundError();
  }

  checkStatusChange({ initialStatus: declaration.status, newStatus: status });

  await declarationRepository.updateOne(declarationId, {
    status,
  });
};
