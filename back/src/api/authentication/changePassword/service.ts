import { compare } from 'bcrypt';
import { UserRepositoryInterface } from '../../../repositories/user.repository';
import userNotFoundError from '../../common/errors/userNotFound.error';
import { getAndCheckUserById } from '../common/services/getAndCheckUser.service';
import { hashPassword } from '../common/services/password.service';
import badCredentialsError from '../../common/errors/badCredentials.error';

interface ILoginServiceOptions {
  oldPassword: string;
  newPassword: string;
  userId: string;
  userRepository: UserRepositoryInterface;
}

export default async ({
  oldPassword,
  newPassword,
  userId,
  userRepository,
}: ILoginServiceOptions): Promise<void> => {
  const user = await getAndCheckUserById({
    userId,
    userRepository,
    error: userNotFoundError(),
  });

  const isGoodPassword = await compare(oldPassword, user.password);
  if (!isGoodPassword) {
    throw badCredentialsError();
  }

  const hashedPassword = await hashPassword(newPassword);

  await userRepository.updateUser(userId, { password: hashedPassword });
};
