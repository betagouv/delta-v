import type { Alpha2Code } from 'i18n-iso-countries';
import { UserRepositoryInterface } from '../../../repositories/user.repository';
import userNotFoundError from '../../common/errors/userNotFound.error';
import { ConfigRepositoryInterface } from '../../../repositories/config.repository';

interface PutDefaultCountryOptions {
  userId: string;
  country: string | null;
  userRepository: UserRepositoryInterface;
  configRepository: ConfigRepositoryInterface;
}

export const service = async ({
  userId,
  country,
  userRepository,
  configRepository,
}: PutDefaultCountryOptions): Promise<void> => {
  const user = await userRepository.getOneById(userId);
  if (!user) {
    throw userNotFoundError();
  }

  const updateConfig = { userId, defaultCountry: country as Alpha2Code | null };

  await configRepository.putOne(updateConfig);
};
