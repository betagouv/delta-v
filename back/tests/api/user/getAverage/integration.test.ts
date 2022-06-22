import request from 'supertest';
import api from '../../../../src/api';
import { User } from '../../../../src/entities/user.entity';
import buildTestApp from '../../../helpers/testApp.helper';
import { testDbManager } from '../../../helpers/testDb.helper';

const testApp = buildTestApp(api);
const testDb = testDbManager();

describe('test getAverage API', () => {
  beforeAll(async () => {
    await testDb.connect();
  });

  beforeEach(async () => {
    await testDb.clear();
  });

  afterAll(async () => {
    await testDb.disconnect();
  });
  it('should get average and status user', async () => {
    const user1: User = {
      id: '6ec0d539-069e-484f-9be8-ac18f8989927',
      ban: false,
      notes: [12, 16, 20],
    };
    const user2: User = {
      id: 'fbab191d-606e-41cf-9e59-72486215aa8b',
      ban: true,
      notes: [12, 16],
    };

    await testDb.persistUser(user1);
    await testDb.persistUser(user2);

    const { status, body } = await request(testApp).get(`/api/user/${user1.id}/average`);
    console.log(body);

    expect(status).toBe(200);
    expect(body).toMatchObject({
      average: 16,
      status: 'accepted',
    });
  });
  it('should not get average and status user - user ban', async () => {
    const user1: User = {
      id: '6ec0d539-069e-484f-9be8-ac18f8989927',
      ban: false,
      notes: [12, 16, 20],
    };
    const user2: User = {
      id: 'fbab191d-606e-41cf-9e59-72486215aa8b',
      ban: true,
      notes: [12, 16],
    };

    await testDb.persistUser(user1);
    await testDb.persistUser(user2);

    const { status } = await request(testApp).get(`/api/user/${user2.id}/average`);

    expect(status).toBe(403);
  });
  it('should not get average and status user - user not found', async () => {
    const user1: User = {
      id: '6ec0d539-069e-484f-9be8-ac18f8989927',
      ban: false,
      notes: [12, 16, 20],
    };
    const user2: User = {
      id: 'fbab191d-606e-41cf-9e59-72486215aa8b',
      ban: true,
      notes: [12, 16],
    };

    const badUserId = '7007d25a-07c4-44f9-8eea-51ab3eabdaf0';
    await testDb.persistUser(user1);
    await testDb.persistUser(user2);

    const { status } = await request(testApp).get(`/api/user/${badUserId}/average`);

    expect(status).toBe(404);
  });
});
