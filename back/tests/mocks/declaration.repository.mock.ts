import {
  DeclarationEntity,
  DeclarationEntityInterface,
} from '../../src/entities/declaration.entity';
import { AppDataSource } from '../../src/loader/database';
import {
  DeclarationRepository,
  DeclarationRepositoryInterface,
} from '../../src/repositories/declaration.repository';

interface DeclarationRepositoryMockOptions {
  getOne?: DeclarationEntityInterface;
  getOneWithPublicId?: DeclarationEntityInterface;
  createOne?: DeclarationEntityInterface;
  getAll?: DeclarationEntityInterface[];
  getManyByIds?: DeclarationEntity[];
}

export const declarationRepositoryMock = (
  options: DeclarationRepositoryMockOptions,
): DeclarationRepositoryInterface => {
  const declarationRepository = AppDataSource.manager.withRepository(DeclarationRepository);
  declarationRepository.createOne = jest.fn().mockResolvedValue(options.createOne);
  declarationRepository.getOne = jest.fn().mockResolvedValue(options.getOne);
  declarationRepository.updateOne = jest.fn().mockResolvedValue(undefined);
  declarationRepository.getAll = jest.fn().mockResolvedValue(options.getAll);
  declarationRepository.getOneWithPublicId = jest
    .fn()
    .mockResolvedValue(options.getOneWithPublicId);
  return declarationRepository;
};
