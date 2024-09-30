import { generateAccessToken, generateRefreshToken } from '../../../core/jwt/generateToken';
import { buildAccessTokenObject, buildRefreshTokenObject } from '../../../core/jwt/verifyToken';
import { UserRepositoryInterface } from '../../../repositories/user.repository';
import invalidTokenError from '../../common/errors/invalidToken.error';
import { getAndCheckUserById } from '../common/services/getAndCheckUser.service';

interface RefreshServiceOptions {
  accessToken: string;
  refreshToken: string;
  userRepository: UserRepositoryInterface;
}
interface RefreshServiceResponse {
  accessToken: string;
  refreshToken: string;
}

export const service = async ({
  accessToken,
  refreshToken,
  userRepository,
}: RefreshServiceOptions): Promise<RefreshServiceResponse> => {
  const userAccessToken = await buildAccessTokenObject(accessToken, true);
  const userRefreshToken = await buildRefreshTokenObject(refreshToken);

  if (!userAccessToken.userId || !userRefreshToken.userId) {
    throw invalidTokenError();
  }
  if (userAccessToken.userId !== userRefreshToken.userId) {
    throw invalidTokenError();
  }

  const user = await getAndCheckUserById({
    userId: userAccessToken.userId,
    userRepository,
    error: invalidTokenError(),
  });

  const newAccessToken = await generateAccessToken({
    userId: user.id,
    email: user.email,
    isAgent: true,
    name: '',
    lastName: '',
  });
  const newRefreshToken = await generateRefreshToken({ userId: user.id, email: user.email });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};
