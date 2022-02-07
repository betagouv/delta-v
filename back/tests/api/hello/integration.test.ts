import request from 'supertest';
import buildTestApp from '../../helpers/testApp.helper';
import hello from '../../../src/api';

const testApp = buildTestApp(hello);

describe('test hello api', () => {
  it('should be success 200 - return Hello World!', async () => {
    const { status, body } = await request(testApp).get('/api/hello');
    expect(status).toBe(200);
    expect(body).toEqual({ message: 'Hello World!' });
  });
});
