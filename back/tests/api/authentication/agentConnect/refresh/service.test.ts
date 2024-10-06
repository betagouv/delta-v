import { Redis } from 'ioredis';
import { service } from '../../../../../src/api/authentication/agentConnect/refresh/service';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../../../../../src/core/jwt/generateToken';
import {
  buildAccessTokenObject,
  buildRefreshTokenObject,
} from '../../../../../src/core/jwt/verifyToken';
import invalidTokenError from '../../../../../src/api/common/errors/invalidToken.error';

jest.mock('../../../../../src/core/jwt/generateToken');
jest.mock('../../../../../src/core/jwt/verifyToken');
jest.mock('../../../../../src/loader/config', () => ({
  config: {
    ACCESS_TOKEN_LIFE: '1h',
    REFRESH_TOKEN_LIFE: '7d',
  },
}));

describe('Refresh service', () => {
  let mockRedisClient: Partial<Redis>;

  beforeEach(() => {
    mockRedisClient = {
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
    };

    (buildAccessTokenObject as jest.Mock).mockResolvedValue({
      userId: 'mockUserId',
      email: 'user@example.com',
      name: 'John',
      lastName: 'Doe',
      isAgent: true,
    });

    (buildRefreshTokenObject as jest.Mock).mockResolvedValue({
      userId: 'mockUserId',
      email: 'user@example.com',
    });

    (generateAccessToken as jest.Mock).mockResolvedValue('newAccessToken');
    (generateRefreshToken as jest.Mock).mockResolvedValue('newRefreshToken');
  });

  it('should refresh tokens successfully', async () => {
    const mockStoredTokenSet = JSON.stringify({
      expires_at: Date.now() + 3600000, // 1 hour from now
    });
    (mockRedisClient.get as jest.Mock).mockResolvedValue(mockStoredTokenSet);

    const result = await service({
      accessToken: 'oldAccessToken',
      refreshToken: 'oldRefreshToken',
      lastRefresh: false,
      userRepository: {} as any,
      redisClient: mockRedisClient as Redis,
    });

    expect(result).toEqual({
      accessToken: 'newAccessToken',
      refreshToken: 'newRefreshToken',
      lastRefresh: true,
      timeToLogout: expect.any(Number),
    });

    expect(mockRedisClient.set).toHaveBeenCalled();
    expect(mockRedisClient.del).toHaveBeenCalledWith('oldRefreshToken');
  });

  it('should throw error for invalid tokens', async () => {
    (buildAccessTokenObject as jest.Mock).mockResolvedValue({ userId: null });

    await expect(
      service({
        accessToken: 'invalidAccessToken',
        refreshToken: 'invalidRefreshToken',
        lastRefresh: false,
        userRepository: {} as any,
        redisClient: mockRedisClient as Redis,
      }),
    ).rejects.toThrow(invalidTokenError());
  });

  it('should handle lastRefresh flag', async () => {
    const mockStoredTokenSet = JSON.stringify({
      expires_at: Date.now() + 3600000, // 1 hour from now
    });
    (mockRedisClient.get as jest.Mock).mockResolvedValue(mockStoredTokenSet);

    const result = await service({
      accessToken: 'oldAccessToken',
      refreshToken: 'oldRefreshToken',
      lastRefresh: true,
      userRepository: {} as any,
      redisClient: mockRedisClient as Redis,
    });

    expect(result).toEqual({
      accessToken: 'newAccessToken',
      refreshToken: 'oldRefreshToken',
      lastRefresh: true,
      timeToLogout: expect.any(Number),
    });

    expect(mockRedisClient.set).not.toHaveBeenCalled();
    expect(mockRedisClient.del).not.toHaveBeenCalled();
  });
});
