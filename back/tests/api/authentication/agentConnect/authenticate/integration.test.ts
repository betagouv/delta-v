import { Express } from 'express';
import request from 'supertest';
import { TokenSet } from 'openid-client';
import * as jose from 'jose';
import buildTestApp from '../../../../helpers/testApp.helper';
import { agentConnectService } from '../../../../../src/core/agentConnect/client';
import { testDbManager } from '../../../../helpers/testDb.helper';
import { prepareContextUser } from '../../../../helpers/prepareContext/user';
import { CustomSession } from '../../../../../src/core/utils/validatedExpressRequest';
import api from '../../../../../src/api';

jest.mock('../../../../../src/core/agentConnect/client', () => {
  const originalModule = jest.requireActual('../../../../../src/core/agentConnect/client');

  return {
    ...originalModule,
    agentConnectService: {
      getTokenSet: jest.fn().mockResolvedValue({
        access_token: 'mockAccessToken',
        id_token: 'mockIdToken',
        refresh_token: 'mockRefreshToken',
        expires_at: Math.floor(Date.now() / 1000) + 3600,
      } as TokenSet),
      getUserInfo: jest.fn().mockResolvedValue({
        sub: 'mockUserId',
        email: 'user@example.com',
        given_name: 'John',
        family_name: 'Doe',
      }),
      getCallbackParams: jest.fn().mockReturnValue({
        code: 'mockCode',
        state: 'mockState',
        iss: 'mockIssuer',
      }),
      verifyIdToken: jest.fn().mockResolvedValue({
        payload: {
          sub: 'mockUserId',
          aud: 'mockClientId',
          exp: Math.floor(Date.now() / 1000) + 3600,
          iat: Math.floor(Date.now() / 1000),
          iss: 'mockIssuer',
          nonce: 'mockNonce',
        },
        protectedHeader: {
          alg: 'RS256',
          kid: 'mockKeyId',
        },
      }),
      getPublicKey: jest.fn().mockResolvedValue({
        // Simuler une clé publique JWK
        kty: 'RSA',
        e: 'AQAB',
        n: 'mockPublicKeyModulus',
        alg: 'RS256',
        kid: 'mockKeyId',
      } as jose.JWK),
    },
  };
});

jest.mock('openid-client', () => {
  const original = jest.requireActual('openid-client');
  return {
    ...original,
    Issuer: {
      ...original.Issuer,
      discover: jest.fn().mockResolvedValue(
        new original.Issuer({
          issuer: 'https://mock-issuer.example.com',
          authorization_endpoint: 'https://mock-issuer.example.com/auth',
          token_endpoint: 'https://mock-issuer.example.com/token',
          userinfo_endpoint: 'https://mock-issuer.example.com/userinfo',
          // Ajoutez d'autres propriétés nécessaires ici
        }),
      ),
    },
  };
});

const testDb = testDbManager();
const mockIdToken =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im1vY2tLaWQifQ.eyJzdWIiOiIxMjM0NTY3ODkwIiwibm9uY2UiOiJtb2NrTm9uY2UiLCJhdF9oYXNoIjoibW9ja0F0SGFzaCIsImFjciI6ImVpZGFzMiIsImF1ZCI6Im1vY2tDbGllbnRJZCIsImV4cCI6MTY3NTI3MjAwMCwiaWF0IjoxNjc1MjY4NDAwLCJpc3MiOiJodHRwczovL21vY2suYWdlbnRjb25uZWN0LmdvdXYuZnIvYXV0aCIsImdpdmVuX25hbWUiOiJKZWFuIiwidXN1YWxfbmFtZSI6IkR1cG9udCIsImVtYWlsIjoiamVhbi5kdXBvbnRAZXhhbXBsZS5jb20iLCJ1aWQiOiIxMjM0NTY3ODkwIiwiYW1yIjpbInB3ZCJdfQ.SIGNATURE';

describe('AgentConnect authenticate endpoint', () => {
  let testApp: Express;

  beforeAll(async () => {
    await testDb.connect();
    testApp = buildTestApp(api);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.only('should authenticate user successfully', async () => {
    const mockRefreshToken = 'mockRefreshToken';
    const mockTokenSet = {
      access_token: 'mockAccessToken',
      id_token: mockIdToken,
      refresh_token: mockRefreshToken,
      expires_at: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
    };
    const { user } = await prepareContextUser({ testDb });

    (agentConnectService.getTokenSet as jest.Mock).mockResolvedValue(mockTokenSet);
    (agentConnectService.getUserInfo as jest.Mock).mockResolvedValue({
      uid: user.id,
      email: user.email,
      given_name: 'John',
      usual_name: 'Doe',
    });

    const mockSession: Partial<CustomSession> = {
      state: 'mockState',
      nonce: 'mockNonce',
    };

    const agent = request.agent(testApp);

    // Définir la session avant d'effectuer la requête d'authentification
    await agent.get('/api/set-session-for-test').send(mockSession);

    const response = await agent
      .get('/api/agent-connect/authenticate')
      .query({ code: 'mockCode', state: 'mockState', iss: 'mockIssuer' });

    const userDataBase = await testDb.getUser(user.id);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
    expect(response.body).toHaveProperty('refreshToken');
    expect(response.body).toHaveProperty('lastRefresh');
    expect(userDataBase).not.toBeNull();
  });

  it('should return 400 for invalid state or nonce', async () => {
    const invalidSession: Partial<CustomSession> = {
      state: 'invalidState',
      nonce: 'invalidNonce',
    };

    const agent = request.agent(testApp);

    // Définir la session invalide avant d'effectuer la requête d'authentification
    await agent.get('/api/set-session-for-test').send(invalidSession);

    const response = await agent
      .get('/api/agent-connect/authenticate')
      .query({ code: 'mockCode', state: 'mockState', iss: 'mockIssuer' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid authentication request' });
  });
});
