import { v4 as uuidv4 } from 'uuid';
import request from 'supertest';
import buildTestApp from '../../helpers/testApp.helper';
import hello from '../../../src/api';
import { testDbManager } from '../../helpers/testDb.helper';

const testApp = buildTestApp(hello);
const testDb = testDbManager();

describe('test hello api', () => {
  beforeAll(async () => {
    await testDb.connect();
  });

  beforeEach(async () => {
    await testDb.clear();
  });

  afterAll(async () => {
    await testDb.disconnect();
  });

  it('should be success 200 - return Hello World!', async () => {
    const id = uuidv4();
    await testDb.persistTest({ id });

    const { status, body } = await request(testApp).get('/api/hello');
    expect(status).toBe(200);
    expect(body).toEqual({ message: `Hello World! ${id}` });
  });
});
