/* eslint-disable @typescript-eslint/unbound-method */
import { agentConnectService } from '../../../../../src/core/agentConnect/client';
import { service } from '../../../../../src/api/authentication/agentConnect/authenticate/service';
import { userRepositoryMock } from '../../../../mocks/user.repository.mock';
import { userEntityFactory } from '../../../../helpers/factories/user.factory';

jest.mock('../../../../../src/core/agentConnect/client');
jest.mock('../../../../../src/repositories/user.repository');

describe('AgentConnect authenticate service', () => {
  const mockTokenSet = {
    access_token: 'mockAccessToken',
    id_token: 'mockIdToken',
    nonce: 'mockNonce',
  };

  const mockUserInfo = {
    email: 'test@example.com',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (agentConnectService.getTokenSet as jest.Mock).mockResolvedValue(mockTokenSet);
    (agentConnectService.getUserInfo as jest.Mock).mockResolvedValue(mockUserInfo);
  });

  it('should authenticate existing user', async () => {
    const mockUser = userEntityFactory({
      email: 'test@example.com',
    });
    const userRepository = userRepositoryMock({
      getOneByEmail: mockUser,
    });

    const result = await service({
      code: 'mockCode',
      state: 'mockState',
      nonce: 'mockNonce',
      agentConnectService,
      userRepository,
    });

    expect(result).toEqual({ user: mockUser, idToken: 'mockIdToken' });
    expect(userRepository.getOneByEmail).toHaveBeenCalledWith('test@example.com');
    expect(userRepository.createUser).not.toHaveBeenCalled();
  });

  it('should create new user if not exists', async () => {
    const userRepository = userRepositoryMock({
      getOneByEmail: null,
    });

    const result = await service({
      code: 'mockCode',
      state: 'mockState',
      nonce: 'mockNonce',
      agentConnectService,
      userRepository,
    });

    expect(result.user).toHaveProperty('email', 'test@example.com');
    expect(result.idToken).toBe('mockIdToken');
    expect(userRepository.createUser).toHaveBeenCalled();
  });

  it('should throw error if nonce is invalid', async () => {
    (agentConnectService.getTokenSet as jest.Mock).mockResolvedValue({
      mockTokenSet,
    });
    const userRepository = userRepositoryMock({});

    await expect(
      service({
        code: 'mockCode',
        state: 'mockState',
        nonce: 'invalidNonce',
        agentConnectService,
        userRepository,
      }),
    ).rejects.toThrow('Invalid nonce');
  });
});
