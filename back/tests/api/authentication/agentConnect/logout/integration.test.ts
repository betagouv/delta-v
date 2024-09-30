import { Express } from 'express';
import request from 'supertest';
import buildTestApp from '../../../../helpers/testApp.helper';
import { testDbManager } from '../../../../helpers/testDb.helper';
import { CustomSession } from '../../../../../src/core/utils/validatedExpressRequest';
import api from '../../../../../src/api';

jest.mock('../../../../../src/core/agentConnect/client', () => {
  const originalModule = jest.requireActual('../../../../../src/core/agentConnect/client');

  return {
    ...originalModule,
    agentConnectService: {
      getLogoutUrl: jest.fn().mockReturnValue('https://mock-logout-url.com'),
    },
  };
});

const testDb = testDbManager();

describe('AgentConnect logout endpoint', () => {
  let testApp: Express;

  beforeAll(async () => {
    await testDb.connect();
    testApp = buildTestApp(api);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return logout URL successfully', async () => {
    const mockSession: Partial<CustomSession> = {
      idToken: 'mockIdToken',
    };

    const agent = request.agent(testApp);

    // Définir la session avant d'effectuer la requête de déconnexion
    await agent.post('/api/set-session-for-test').send(mockSession);

    const response = await agent.get('/api/agent-connect/logout');

    expect(response.status).toBe(302);
    expect(response.header.location).toBe('https://mock-logout-url.com');
  });

  it('should return 400 if idToken is missing in session', async () => {
    const invalidSession: Partial<CustomSession> = {};

    const agent = request.agent(testApp);

    // Définir une session invalide sans idToken
    await agent.post('/api/set-session-for-test').send(invalidSession);

    const response = await agent.get('/api/agent-connect/logout');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Missing idToken in session' });
  });
});
