/* eslint-disable @typescript-eslint/unbound-method */
import { Redis } from 'ioredis';
import { TokenSet } from 'openid-client';
import * as jose from 'jose';
import { agentConnectServiceMock } from '../../../../mocks/agentConnect.service.mock';
import { service } from '../../../../../src/api/authentication/agentConnect/authenticate/service';
import { userRepositoryMock } from '../../../../mocks/user.repository.mock';
import { userEntityFactory } from '../../../../helpers/factories/user.factory';
import { AgentConnectService } from '../../../../../src/core/agentConnect/service';

jest.mock('../../../../../src/repositories/user.repository');
jest.mock('ioredis');

const mockIdToken =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im1vY2tLaWQifQ.eyJzdWIiOiIxMjM0NTY3ODkwIiwibm9uY2UiOiJtb2NrTm9uY2UiLCJhdF9oYXNoIjoibW9ja0F0SGFzaCIsImFjciI6ImVpZGFzMiIsImF1ZCI6Im1vY2tDbGllbnRJZCIsImV4cCI6MTY3NTI3MjAwMCwiaWF0IjoxNjc1MjY4NDAwLCJpc3MiOiJodHRwczovL21vY2suYWdlbnRjb25uZWN0LmdvdXYuZnIvYXV0aCIsImdpdmVuX25hbWUiOiJKZWFuIiwidXN1YWxfbmFtZSI6IkR1cG9udCIsImVtYWlsIjoiamVhbi5kdXBvbnRAZXhhbXBsZS5jb20iLCJ1aWQiOiIxMjM0NTY3ODkwIiwiYW1yIjpbInB3ZCJdfQ.SIGNATURE';

describe('AgentConnect authenticate service', () => {
  const mockTokenSet: Partial<TokenSet> = {
    access_token: 'mockAccessToken',
    id_token: mockIdToken,
    // ... autres propriétés ...
  };

  const mockUserInfo = {
    uid: 'mockUserId',
    email: 'test@example.com',
    given_name: 'John',
    usual_name: 'Doe',
  };

  const mockRedisClient = {
    set: jest.fn().mockResolvedValue('OK'),
  } as unknown as Redis;

  const mockReq = {
    query: { code: 'mockCode', state: 'mockState', iss: 'mockIssuer' },
  } as any;

  it('should authenticate existing user', async () => {
    const mockUser = userEntityFactory({
      email: 'test@example.com',
    });
    const userRepository = userRepositoryMock({
      getOneByEmail: mockUser,
    });

    const agentConnectService = agentConnectServiceMock({
      getCallbackParams: { code: 'mockCode', state: 'mockState' },
      getTokenSet: mockTokenSet as TokenSet,
      getUserInfo: mockUserInfo,
      verifyIdToken: {
        payload: {
          nonce: 'mockNonce',
        },
        protectedHeader: { alg: 'RS256' },
      } as unknown as jose.JWTVerifyResult,
    });

    const result = await service({
      req: mockReq,
      state: 'mockState',
      nonce: 'mockNonce',
      agentConnectService: agentConnectService as AgentConnectService,
      userRepository,
      redisClient: mockRedisClient,
    });

    expect(result).toHaveProperty('idToken', mockIdToken);
    expect(result).toHaveProperty('accessToken');
    expect(result).toHaveProperty('refreshToken');
    expect(result).toHaveProperty('lastRefresh');
    expect(userRepository.getOneByEmail).toHaveBeenCalledWith('test@example.com');
    expect(userRepository.createUser).not.toHaveBeenCalled();
    expect(mockRedisClient.set).toHaveBeenCalled();
    expect(agentConnectService.getCallbackParams).toHaveBeenCalledWith(mockReq);
    expect(agentConnectService.getTokenSet).toHaveBeenCalledWith(
      { code: 'mockCode', state: 'mockState' },
      'mockState',
      'mockNonce',
    );
    expect(agentConnectService.getUserInfo).toHaveBeenCalledWith('mockAccessToken');
    expect(agentConnectService.verifyIdToken).toHaveBeenCalledWith(mockIdToken);
  });

  it('should create new user if not exists', async () => {
    const userRepository = userRepositoryMock({
      getOneByEmail: null,
    });

    const agentConnectService = agentConnectServiceMock({
      getCallbackParams: { code: 'mockCode', state: 'mockState' },
      getTokenSet: mockTokenSet as TokenSet,
      getUserInfo: mockUserInfo,
      verifyIdToken: {
        payload: {
          nonce: 'mockNonce',
        },
        protectedHeader: { alg: 'RS256' },
      } as unknown as jose.JWTVerifyResult,
    });

    const result = await service({
      req: mockReq,
      state: 'mockState',
      nonce: 'mockNonce',
      agentConnectService: agentConnectService as AgentConnectService,
      userRepository,
      redisClient: mockRedisClient,
    });

    expect(result).toHaveProperty('idToken', mockIdToken);
    expect(result).toHaveProperty('accessToken');
    expect(result).toHaveProperty('refreshToken');
    expect(result).toHaveProperty('lastRefresh');
    expect(userRepository.createUser).toHaveBeenCalled();
  });

  it.only('should throw error if nonce is invalid', async () => {
    const agentConnectService = agentConnectServiceMock({
      getCallbackParams: { code: 'mockCode', state: 'mockState' },
      getTokenSet: mockTokenSet as TokenSet,
      getUserInfo: mockUserInfo,
      verifyIdToken: {
        payload: {
          nonce: 'mockNonce',
        },
        protectedHeader: { alg: 'RS256' },
      } as unknown as jose.JWTVerifyResult,
    });
    const userRepository = userRepositoryMock({});

    await expect(
      service({
        req: mockReq,
        state: 'mockState',
        nonce: 'invalidNonce',
        agentConnectService: agentConnectService as AgentConnectService,
        userRepository,
        redisClient: mockRedisClient,
      }),
    ).rejects.toThrow('Invalid token signature');
  });
});
