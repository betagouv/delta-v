import { Express } from 'express';
import request from 'supertest';
import buildTestApp from '../../../../helpers/testApp.helper';
import api from '../../../../../src/api';
import { agentConnectService } from '../../../../../src/core/agentConnect/client';
import { testDbManager } from '../../../../helpers/testDb.helper';

jest.mock('../../../../../src/core/agentConnect/client');

const testDb = testDbManager();

describe('AgentConnect initiate endpoint', () => {
  let testApp: Express;

  beforeAll(async () => {
    await testDb.connect();
    testApp = buildTestApp(api);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect to authorization URL', async () => {
    const mockAuthUrl = 'https://mock-auth-url.com';
    (agentConnectService.getAuthorizationUrl as jest.Mock).mockReturnValue(mockAuthUrl);

    const response = await request(testApp).get('/api/agent-connect/initiate');

    expect(response.status).toBe(302);
    expect(response.header.location).toBe(mockAuthUrl);
  });
});
