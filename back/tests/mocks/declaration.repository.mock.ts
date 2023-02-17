import {
  DeclarationEntity,
  DeclarationEntityInterface,
} from '../../src/entities/declaration.entity';
import DeclarationRepository, {
  DeclarationRepositoryInterface,
} from '../../src/repositories/declaration.repository';

interface DeclarationRepositoryMockOptions {
  createOne?: DeclarationEntityInterface;
  getManyByIds?: DeclarationEntity[];
}

export const declarationRepositoryMock = (
  options: DeclarationRepositoryMockOptions,
): DeclarationRepositoryInterface => {
  const declarationRepository = new DeclarationRepository();
  declarationRepository.createOne = jest.fn().mockResolvedValue(options.createOne);
  return declarationRepository;
};
