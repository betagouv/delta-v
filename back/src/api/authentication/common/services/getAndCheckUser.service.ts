import { IAppError } from '../../../../core/buildError';
import { User } from '../../../../entities/user.entity';
import { UserRepositoryInterface } from '../../../../repositories/user.repository';
import badCredentialsError from '../../../common/errors/badCredentials.error';
import userBlockedError from '../../../common/errors/userBlocked.error';
import userNotEnabledError from '../../../common/errors/userNotEnabled.error';

interface IGetAndCheckUserByEmailOptions {
  email: string;
  userRepository: UserRepositoryInterface;
  error?: IAppError;
}

interface IGetAndCheckUserByIdOptions {
  userId: string;
  userRepository: UserRepositoryInterface;
  error?: IAppError;
}

interface ICheckUserOptions {
  user: User | null;
  error?: IAppError;
}

export const checkUser = ({ user, error }: ICheckUserOptions): User => {
  if (!user) {
    throw error;
  }

  if (user.blocked) {
    throw userBlockedError();
  }

  if (!user.enabled) {
    throw userNotEnabledError();
  }

  return user;
};

export const getAndCheckUserByEmail = async ({
  email,
  userRepository,
  error = badCredentialsError(),
}: IGetAndCheckUserByEmailOptions): Promise<User> => {
  const user = await userRepository.getOneByEmail(email);

  return checkUser({ user, error });
};

export const getAndCheckUserById = async ({
  userId,
  userRepository,
  error = badCredentialsError(),
}: IGetAndCheckUserByIdOptions): Promise<User> => {
  const user = await userRepository.getOneById(userId);

  return checkUser({ user, error });
};
