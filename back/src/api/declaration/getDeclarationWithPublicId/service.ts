import { DeclarationEntityInterface } from '../../../entities/declaration.entity';
import { DeclarationRepositoryInterface } from '../../../repositories/declaration.repository';
import declarationNotFoundError from '../../common/errors/declarationNotFound.error';

export interface IGetOneDeclarationWithPublicIdServiceOptions {
  publicDeclarationId: string;
  declarationRepository: DeclarationRepositoryInterface;
}

export default async ({
  publicDeclarationId,
  declarationRepository,
}: IGetOneDeclarationWithPublicIdServiceOptions): Promise<DeclarationEntityInterface> => {
  const declaration = await declarationRepository.getOneWithPublicId(publicDeclarationId);
  if (!declaration) {
    throw declarationNotFoundError();
  }

  return declaration;
};
