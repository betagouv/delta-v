import { compare } from 'bcrypt';

import { UserRepositoryInterface } from '../../../repositories/user.repository';
import badCredentialsError from '../../common/errors/badCredentials.error';
import { getAndCheckUserByEmail } from '../common/services/getAndCheckUser.service';
import { generateAccessToken, generateRefreshToken } from '../../../core/jwt/generateToken';

interface ILoginServiceOptions {
  email: string;
  password: string;
  userRepository: UserRepositoryInterface;
}

interface ILoginServiceResponse {
  accessToken: string;
  refreshToken: string;
}

export const service = async ({
  email,
  password,
  userRepository,
}: ILoginServiceOptions): Promise<ILoginServiceResponse> => {
  const user = await getAndCheckUserByEmail({
    email,
    userRepository,
    error: badCredentialsError(),
  });
  const isGoodPassword = await compare(password, user.password);
  if (!isGoodPassword) {
    throw badCredentialsError();
  }

  const accessToken = await generateAccessToken({
    userId: user.id,
    email: user.email,
    isAgent: true,
    name: '',
    lastName: '',
  });
  const refreshToken = await generateRefreshToken({ userId: user.id, email: user.email });

  return { accessToken, refreshToken };
};
