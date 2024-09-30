import { Express } from 'express';
import request from 'supertest';
import buildTestApp from '../../../../helpers/testApp.helper';
import { testDbManager } from '../../../../helpers/testDb.helper';
import { CustomSession } from '../../../../../src/core/utils/validatedExpressRequest';
import api from '../../../../../src/api';

const testDb = testDbManager();

describe('AgentConnect logout callback endpoint', () => {
  let testApp: Express;

  beforeAll(async () => {
    await testDb.connect();
    testApp = buildTestApp(api);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should process logout callback successfully', async () => {
    const mockSession: Partial<CustomSession> = {
      logoutState: 'mockState',
      refreshToken: 'mockRefreshToken',
    };

    const agent = request.agent(testApp);

    // Définir la session avant d'effectuer la requête de déconnexion
    await agent.post('/api/set-session-for-test').send(mockSession);

    const response = await agent
      .post('/api/agent-connect/logout-callback')
      .send({ state: 'mockState' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Logout successful' });
  });

  it('should return 400 for invalid state', async () => {
    const mockSession: Partial<CustomSession> = {
      logoutState: 'correctState',
    };

    const agent = request.agent(testApp);

    // Définir la session avant d'effectuer la requête de déconnexion
    await agent.post('/api/set-session-for-test').send(mockSession);

    const response = await agent
      .post('/api/agent-connect/logout-callback')
      .send({ state: 'invalidState' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid logout request' });
  });
});
