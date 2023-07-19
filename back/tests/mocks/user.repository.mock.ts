import { User } from '../../src/entities/user.entity';
import { AppDataSource } from '../../src/loader/database';
import { UserRepository, UserRepositoryInterface } from '../../src/repositories/user.repository';

interface IUserMockOptions {
  getOneByEmail?: User | null;
  getOneById?: User | null;
}

export const userRepositoryMock = ({
  getOneByEmail = null,
  getOneById = null,
}: IUserMockOptions): UserRepositoryInterface => {
  const productRepository = AppDataSource.manager.withRepository(UserRepository);
  productRepository.createUser = jest.fn().mockResolvedValue(undefined);
  productRepository.updateUser = jest.fn().mockResolvedValue(undefined);
  productRepository.getOneByEmail = jest.fn().mockResolvedValue(getOneByEmail);
  productRepository.getOneById = jest.fn().mockResolvedValue(getOneById);
  productRepository.validateUserAccount = jest.fn().mockResolvedValue(undefined);
  return productRepository;
};
