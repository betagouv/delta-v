/* eslint-disable @typescript-eslint/unbound-method */
import { Issuer, Client, TokenSet } from 'openid-client';
import { AgentConnectConfig } from '../../src/core/agentConnect/config';
import { AgentConnectService } from '../../src/core/agentConnect/service';

jest.mock('openid-client');

describe('AgentConnectService', () => {
  const mockConfig: AgentConnectConfig = {
    issuer: 'https://mock-issuer.com',
    clientId: 'mockClientId',
    clientSecret: 'mockClientSecret',
    redirectUri: 'https://mock-redirect.com',
    postLogoutRedirectUri: 'https://mock-logout.com',
    id_token_signed_response_alg: 'RS256',
    userinfo_signed_response_alg: 'RS256',
    scope: 'openid email profile',
  };

  let agentConnectService: AgentConnectService;
  let mockClient: jest.Mocked<Client>;

  beforeEach(() => {
    mockClient = {
      authorizationUrl: jest.fn(),
      callback: jest.fn(),
      userinfo: jest.fn(),
      endSessionUrl: jest.fn(),
    } as unknown as jest.Mocked<Client>;

    (Issuer.discover as jest.Mock).mockResolvedValue({
      Client: jest.fn().mockReturnValue(mockClient),
    });

    agentConnectService = new AgentConnectService(mockConfig);
  });

  it('should initialize client correctly', async () => {
    await (agentConnectService as any).initializeClient();
    expect(Issuer.discover).toHaveBeenCalledWith(mockConfig.issuer);
    expect((agentConnectService as any).client).toBe(mockClient);
  });

  it('should get authorization URL', () => {
    const mockAuthUrl = 'https://mock-auth-url.com';
    mockClient.authorizationUrl.mockReturnValue(mockAuthUrl);

    const result = agentConnectService.getAuthorizationUrl('mockState', 'mockNonce');
    expect(result).toBe(mockAuthUrl);
    expect(mockClient.authorizationUrl).toHaveBeenCalledWith(
      expect.objectContaining({
        scope: 'openid email profile',
        state: 'mockState',
        nonce: 'mockNonce',
        acr_values: 'eidas1',
        prompt: 'login',
      }),
    );
  });

  it('should get token set', async () => {
    const mockTokenSet: TokenSet = {
      access_token: 'mockAccessToken',
      token_type: 'Bearer',
      id_token: 'mockIdToken',
      expires_at: 1234567890,
      expired: jest.fn().mockReturnValue(false),
      claims: jest.fn().mockReturnValue({}),
    };
    mockClient.callback.mockResolvedValue(mockTokenSet);

    const result = await agentConnectService.getTokenSet('mockCode', 'mockState', 'mockNonce');
    expect(result).toBe(mockTokenSet);
    expect(mockClient.callback).toHaveBeenCalledWith(mockConfig.redirectUri, 'mockCode', {
      state: 'mockState',
      nonce: 'mockNonce',
    });
  });

  it('should get user info', async () => {
    const mockUserInfo = { sub: 'mockSub', email: 'mock@example.com' };
    mockClient.userinfo.mockResolvedValue(mockUserInfo);

    const result = await agentConnectService.getUserInfo('mockAccessToken');
    expect(result).toBe(mockUserInfo);
    expect(mockClient.userinfo).toHaveBeenCalledWith('mockAccessToken');
  });

  it('should map user info to Agent', () => {
    const mockUserInfo = {
      sub: 'mockSub',
      email: 'mock@example.com',
      given_name: 'John',
      family_name: 'Doe',
      preferred_username: 'johndoe',
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-02T00:00:00Z',
    };

    const result = agentConnectService.mapToUser(mockUserInfo);
    expect(result).toEqual({
      id: 'mockSub',
      email: 'mock@example.com',
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      createdAt: new Date('2023-01-01T00:00:00Z'),
      updatedAt: new Date('2023-01-02T00:00:00Z'),
    });
  });
});
