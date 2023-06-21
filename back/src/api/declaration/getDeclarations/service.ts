import { DeclarationEntityInterface } from '../../../entities/declaration.entity';
import { DeclarationRepositoryInterface } from '../../../repositories/declaration.repository';

export interface IGetOneDeclarationServiceOptions {
  limit: number;
  offset: number;
  search?: string;
  searchPublicId?: string;
  status?: string;
  declarationRepository: DeclarationRepositoryInterface;
}

export default async ({
  limit,
  offset,
  search,
  searchPublicId,
  status,
  declarationRepository,
}: IGetOneDeclarationServiceOptions): Promise<DeclarationEntityInterface[]> => {
  const declarations = await declarationRepository.getAll({
    limit,
    offset,
    search,
    searchPublicId,
    status,
  });

  return declarations;
};
