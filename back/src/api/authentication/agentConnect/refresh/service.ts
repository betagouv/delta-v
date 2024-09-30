import { Redis } from 'ioredis'; // Import Redis type
import { generateAccessToken, generateRefreshToken } from '../../../../core/jwt/generateToken';
import { buildAccessTokenObject, buildRefreshTokenObject } from '../../../../core/jwt/verifyToken';
import { UserRepositoryInterface } from '../../../../repositories/user.repository';
import invalidTokenError from '../../../common/errors/invalidToken.error';
import { getAndCheckUserById } from '../../common/services/getAndCheckUser.service';
import { config } from '../../../../loader/config';
import { convertToMilliseconds } from '../../../../utils/convertToMilliseconds.util';

interface RefreshServiceOptions {
  accessToken: string;
  refreshToken: string;
  lastRefresh: boolean;
  userRepository: UserRepositoryInterface;
  redisClient: Redis; // Add Redis client to the options
}

interface RefreshServiceResponse {
  accessToken: string;
  refreshToken: string;
  lastRefresh: boolean;
}

export const service = async ({
  accessToken,
  refreshToken,
  lastRefresh,
  userRepository,
  redisClient,
}: RefreshServiceOptions): Promise<RefreshServiceResponse> => {
  const userAccessToken = await buildAccessTokenObject(accessToken, true);
  const userRefreshToken = await buildRefreshTokenObject(refreshToken);

  if (!userAccessToken.userId || !userRefreshToken.userId) {
    throw invalidTokenError();
  }
  if (userAccessToken.userId !== userRefreshToken.userId) {
    throw invalidTokenError();
  }

  // Check if the refresh token exists in Redis
  const storedTokenSet = await redisClient.get(refreshToken);
  if (!storedTokenSet) {
    throw invalidTokenError();
  }

  const user = await getAndCheckUserById({
    userId: userAccessToken.userId,
    userRepository,
    error: invalidTokenError(),
  });

  console.log('🚀 ~ service ~ user:', user);

  // Determine the new refresh token expiry
  const tokenSet = JSON.parse(storedTokenSet);

  const accessTokenExpiry = Math.min(
    convertToMilliseconds(config.ACCESS_TOKEN_LIFE),
    tokenSet.expires_at
      ? tokenSet.expires_at * 1000 - Date.now()
      : convertToMilliseconds(config.ACCESS_TOKEN_LIFE),
  );

  // Generate new access token
  const newAccessToken = await generateAccessToken(
    {
      ...userAccessToken,
    },
    accessTokenExpiry,
  );

  const refreshTokenExpiry = Math.min(
    convertToMilliseconds(config.REFRESH_TOKEN_LIFE),
    tokenSet.expires_at ? tokenSet.expires_at : convertToMilliseconds(config.REFRESH_TOKEN_LIFE),
  );

  // Generate new refresh token
  const newRefreshToken = await generateRefreshToken(
    {
      userId: userAccessToken.userId,
      email: userAccessToken.email,
    },
    refreshTokenExpiry,
  );

  // Store the new refresh token in Redis
  await redisClient.set(newRefreshToken, JSON.stringify(tokenSet), 'EX', refreshTokenExpiry);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    lastRefresh: refreshTokenExpiry === tokenSet.expires_at ? true : false,
  };
};
