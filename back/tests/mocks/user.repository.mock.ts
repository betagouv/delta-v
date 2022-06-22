import { User } from '../../src/entities/user.entity';
import UserRepository, { UserRepositoryInterface } from '../../src/repositories/user.repository';

interface IUserMockOptions {
  getOne?: User;
}

export const userRepositoryMock = (options: IUserMockOptions): UserRepositoryInterface => {
  const userRepository = new UserRepository();
  userRepository.getOne = jest.fn().mockResolvedValue(options.getOne);
  return userRepository;
};
