import { DeclarationEntity } from '../../../entities/declaration.entity';
import { DeclarationRepositoryInterface } from '../../../repositories/declaration.repository';
import declarationNotFoundError from '../../common/errors/declarationNotFound.error';

export interface IGetOneDeclarationForAgentServiceOptions {
  declarationId: string;
  declarationRepository: DeclarationRepositoryInterface;
}

export default async ({
  declarationId,
  declarationRepository,
}: IGetOneDeclarationForAgentServiceOptions): Promise<DeclarationEntity> => {
  const declaration = await declarationRepository.getOne(declarationId);
  if (!declaration) {
    throw declarationNotFoundError();
  }

  return declaration;
};
