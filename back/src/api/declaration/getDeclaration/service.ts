import { DeclarationEntityInterface } from '../../../entities/declaration.entity';
import { DeclarationRepositoryInterface } from '../../../repositories/declaration.repository';
import declarationNotFoundError from '../../common/errors/declarationNotFound.error';

export interface IGetOneDeclarationServiceOptions {
  declarationId: string;
  declarationRepository: DeclarationRepositoryInterface;
}

export default async ({
  declarationId,
  declarationRepository,
}: IGetOneDeclarationServiceOptions): Promise<DeclarationEntityInterface> => {
  const declaration = await declarationRepository.getOne(declarationId);
  if (!declaration) {
    throw declarationNotFoundError();
  }

  return declaration;
};
