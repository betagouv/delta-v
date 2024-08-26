import { Express } from 'express';
import request from 'supertest';
import buildTestApp from '../../../../helpers/testApp.helper';
import api from '../../../../../src/api';
import { agentConnectService } from '../../../../../src/core/agentConnect/client';
import { testDbManager } from '../../../../helpers/testDb.helper';

jest.mock('../../../../../src/core/agentConnect/client');

const testDb = testDbManager();

describe('AgentConnect logout endpoint', () => {
  let testApp: Express;

  beforeAll(async () => {
    await testDb.connect();
    testApp = buildTestApp(api);
  });

  it.only('should redirect to logout URL', async () => {
    const mockLogoutUrl = 'https://mock-logout-url.com';
    (agentConnectService.getLogoutUrl as jest.Mock).mockReturnValue(mockLogoutUrl);

    const response = await request(testApp)
      .get('/api/agent-connect/logout')
      .set('Cookie', ['idToken=mockIdToken']);

    expect(response.status).toBe(302);
    expect(response.header.location).toBe(mockLogoutUrl);
  });

  it('should return 400 if no active session', async () => {
    const response = await request(testApp).get('/api/agent-connect/logout');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'No active session' });
  });
});
