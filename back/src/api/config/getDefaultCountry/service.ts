import { UserRepositoryInterface } from '../../../repositories/user.repository';
import userNotFoundError from '../../common/errors/userNotFound.error';
import { ConfigRepositoryInterface } from '../../../repositories/config.repository';
import { Config } from '../../../entities/config.entity';

interface GetDefaultCountryOptions {
  userId: string;
  userRepository: UserRepositoryInterface;
  configRepository: ConfigRepositoryInterface;
}

export const service = async ({
  userId,
  userRepository,
  configRepository,
}: GetDefaultCountryOptions): Promise<Config | null> => {
  const user = await userRepository.getOneById(userId);
  if (!user) {
    throw userNotFoundError();
  }

  return await configRepository.getOne(userId);
};
