/* eslint-disable @typescript-eslint/unbound-method */
import { Redis } from 'ioredis';
import { service } from '../../../../../src/api/authentication/agentConnect/logoutCallback/service';
import { ValidatedRequest } from '../../../../../src/core/utils/validatedExpressRequest';
import { ILogoutCallbackRequest } from '../../../../../src/api/authentication/agentConnect/logoutCallback/validator';

describe('AgentConnect logout callback service', () => {
  it('should clear session and remove refresh token from Redis', async () => {
    const mockSession = {
      refreshToken: 'mockRefreshToken',
    };
    const mockReq = {
      session: {
        ...mockSession,
        destroy: jest.fn().mockImplementation((callback) => callback(null)),
      },
    } as unknown as ValidatedRequest<ILogoutCallbackRequest>;

    const mockRedisClient = {
      del: jest.fn().mockResolvedValue(1),
    } as unknown as Redis;

    await service({
      req: mockReq,
      redisClient: mockRedisClient,
    });

    expect(mockReq.session.destroy).toHaveBeenCalled();
    expect(mockRedisClient.del).toHaveBeenCalledWith(mockSession.refreshToken);
  });

  it('should handle case when there is no refresh token', async () => {
    const mockReq = {
      session: {
        destroy: jest.fn().mockImplementation((callback) => callback(null)),
      },
    } as unknown as ValidatedRequest<ILogoutCallbackRequest>;

    const mockRedisClient = {
      del: jest.fn().mockResolvedValue(1),
    } as unknown as Redis;

    await service({
      req: mockReq,
      redisClient: mockRedisClient,
    });

    expect(mockReq.session.destroy).toHaveBeenCalled();
    expect(mockRedisClient.del).not.toHaveBeenCalled();
  });

  it('should throw an error if session destruction fails', async () => {
    const mockReq = {
      session: {
        refreshToken: 'mockRefreshToken',
        destroy: jest
          .fn()
          .mockImplementation((callback) => callback(new Error('Session destruction failed'))),
      },
    } as unknown as ValidatedRequest<ILogoutCallbackRequest>;

    const mockRedisClient = {
      del: jest.fn().mockResolvedValue(1),
    } as unknown as Redis;

    await expect(
      service({
        req: mockReq,
        redisClient: mockRedisClient,
      }),
    ).rejects.toThrow('Session destruction failed');
  });
});
