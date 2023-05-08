import { buildResetPasswordTokenObject } from '../../../core/jwt/verifyToken';
import { UserRepositoryInterface } from '../../../repositories/user.repository';
import invalidTokenError from '../../common/errors/invalidToken.error';
import userNotFoundError from '../../common/errors/userNotFound.error';
import { getAndCheckUserById } from '../common/services/getAndCheckUser.service';
import { hashPassword } from '../common/services/password.service';

interface ILoginServiceOptions {
  token: string;
  password: string;
  userRepository: UserRepositoryInterface;
}

export default async ({ token, password, userRepository }: ILoginServiceOptions): Promise<void> => {
  const { userId } = await buildResetPasswordTokenObject(token);

  if (!userId) {
    throw invalidTokenError();
  }

  await getAndCheckUserById({
    userId,
    userRepository,
    error: userNotFoundError(),
  });

  const hashedPassword = await hashPassword(password);

  await userRepository.updateUser(userId, { password: hashedPassword });
};
