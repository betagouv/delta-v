import { buildValidationTokenObject } from '../../../core/jwt/verifyToken';
import { UserRepositoryInterface } from '../../../repositories/user.repository';
import invalidTokenError from '../../common/errors/invalidToken.error';
import userBlockedError from '../../common/errors/userBlocked.error';
import userNotFoundError from '../../common/errors/userNotFound.error';

interface IValidationEmailServiceOptions {
  token: string;
  userRepository: UserRepositoryInterface;
}

export default async ({ token, userRepository }: IValidationEmailServiceOptions): Promise<void> => {
  const { userId } = await buildValidationTokenObject(token);
  if (!userId) {
    throw invalidTokenError();
  }

  const user = await userRepository.getOneById(userId);

  if (!user) {
    throw userNotFoundError();
  }
  if (user.blocked) {
    throw userBlockedError();
  }

  await userRepository.validateUserAccount(user.id);
};
