import request from 'supertest';
import api from '../../../../src/api';
import { prepareContextDeclaration } from '../../../helpers/prepareContext/declaration';
import buildTestApp from '../../../helpers/testApp.helper';
import { testDbManager } from '../../../helpers/testDb.helper';

const testApp = buildTestApp(api);
const testDb = testDbManager();

describe('getOneDeclaration endpoint', () => {
  beforeAll(async () => {
    await testDb.connect();
  });

  beforeEach(async () => {
    await testDb.clear();
  });

  afterAll(async () => {
    await testDb.disconnect();
  });
  it('should return a declaration', async () => {
    await prepareContextDeclaration({ testDb });
    const declaration = await prepareContextDeclaration({ testDb });

    const { status, body } = await request(testApp).get(`/api/declaration/${declaration.id}`);

    expect(status).toBe(200);
    expect(body).toMatchObject({
      declaration: {
        id: declaration.id,
      },
    });
  });
  it('should return a 404 error if the declaration does not exist', async () => {
    await prepareContextDeclaration({ testDb });
    const declaration = await prepareContextDeclaration({ testDb, saveDeclaration: false });

    const { status, body } = await request(testApp).get(`/api/declaration/${declaration.id}`);

    expect(status).toBe(404);
    expect(body.code).toEqual('declaration-not-found');
  });
});
