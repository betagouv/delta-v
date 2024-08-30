import { Express } from 'express';
import request from 'supertest';
import buildTestApp from '../../../../helpers/testApp.helper';
import api from '../../../../../src/api';
import { agentConnectService } from '../../../../../src/core/agentConnect/client';
import { testDbManager } from '../../../../helpers/testDb.helper';
import { prepareContextUser } from '../../../../helpers/prepareContext/user';

jest.mock('../../../../../src/core/agentConnect/client');

const testDb = testDbManager();

describe('AgentConnect authenticate endpoint', () => {
  let testApp: Express;

  beforeAll(async () => {
    await testDb.connect();
    testApp = buildTestApp(api);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should authenticate user successfully', async () => {
    const mockTokenSet = {
      access_token: 'mockAccessToken',
      id_token: 'mockIdToken',
      nonce: 'mockNonce',
    };
    const { user } = await prepareContextUser({ testDb });

    (agentConnectService.getTokenSet as jest.Mock).mockResolvedValue(mockTokenSet);
    (agentConnectService.getUserInfo as jest.Mock).mockResolvedValue(user);

    const response = await request(testApp)
      .post('/api/agent-connect/authenticate')
      .send({ code: 'mockCode', state: 'mockState', nonce: 'mockNonce' })
      .set('set-cookie', 'connect.sid=mockSessionId');

    expect(response.status).toBe(200);
  });

  it('should return 400 for invalid state or nonce', async () => {
    const response = await request(testApp)
      .post('/api/agent-connect/authenticate')
      .send({ code: 'mockCode', state: 'invalidState', nonce: 'invalidNonce' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid authentication request' });
  });
});
