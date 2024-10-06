import { Redis } from 'ioredis'; // Import Redis type
import { generateAccessToken, generateRefreshToken } from '../../../../core/jwt/generateToken';
import { buildAccessTokenObject, buildRefreshTokenObject } from '../../../../core/jwt/verifyToken';
import { UserRepositoryInterface } from '../../../../repositories/user.repository';
import invalidTokenError from '../../../common/errors/invalidToken.error';
import { config } from '../../../../loader/config';
import { convertToMilliseconds } from '../../../../utils/convertToMilliseconds.util';

interface RefreshServiceOptions {
  accessToken: string;
  refreshToken: string;
  lastRefresh: boolean;
  userRepository: UserRepositoryInterface;
  redisClient: Redis;
}

interface RefreshServiceResponse {
  accessToken: string;
  refreshToken: string;
  lastRefresh: boolean;
  timeToLogout: number;
}

export const service = async ({
  accessToken,
  refreshToken,
  lastRefresh,
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

  const storedTokenSet = await redisClient.get(refreshToken);
  if (!storedTokenSet) {
    throw invalidTokenError();
  }

  const tokenSet = JSON.parse(storedTokenSet);
  const tokenSetExpiry = tokenSet.expires_at
    ? new Date(tokenSet.expires_at).getTime() - Date.now()
    : convertToMilliseconds(config.ACCESS_TOKEN_LIFE);

  const accessTokenExpiry = Math.min(
    convertToMilliseconds(config.ACCESS_TOKEN_LIFE),
    tokenSetExpiry,
  );

  const accessTokenExpiryInSeconds = Math.floor(accessTokenExpiry / 1000);

  const newAccessToken = await generateAccessToken(
    {
      userId: userAccessToken.userId,
      email: userAccessToken.email,
      name: userAccessToken.name,
      lastName: userAccessToken.lastName,
      isAgent: userAccessToken.isAgent,
    },
    accessTokenExpiryInSeconds,
  );

  if (lastRefresh) {
    return {
      accessToken: newAccessToken,
      refreshToken,
      lastRefresh: true,
      timeToLogout: tokenSetExpiry,
    };
  }

  const refreshTokenExpiry = Math.min(
    convertToMilliseconds(config.REFRESH_TOKEN_LIFE),
    tokenSetExpiry,
  );

  const refreshTokenExpiryInSeconds = Math.floor(refreshTokenExpiry / 1000);

  const newRefreshToken = await generateRefreshToken(
    {
      userId: userAccessToken.userId,
      email: userAccessToken.email,
    },
    refreshTokenExpiryInSeconds,
  );

  await redisClient.set(
    newRefreshToken,
    JSON.stringify(tokenSet),
    'EX',
    refreshTokenExpiryInSeconds,
  );
  await redisClient.del(refreshToken);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    lastRefresh: refreshTokenExpiry === tokenSetExpiry ? true : false,
    timeToLogout: tokenSetExpiry,
  };
};
