import request from 'supertest';
import api from '../../../../src/api';
import { prepareContextDeclaration } from '../../../helpers/prepareContext/declaration';
import buildTestApp from '../../../helpers/testApp.helper';
import { testDbManager } from '../../../helpers/testDb.helper';
import { prepareContextUser } from '../../../helpers/prepareContext/user';

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
    const { accessToken } = await prepareContextUser({ testDb });
    await prepareContextDeclaration({ testDb });
    const declaration = await prepareContextDeclaration({ testDb });

    const { status, body } = await request(testApp)
      .get(`/api/declaration/${declaration.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(status).toBe(200);
    expect(body).toMatchObject({
      declaration: {
        id: declaration.id,
      },
    });
  });
  it('should return a 404 error if the declaration does not exist', async () => {
    const { accessToken } = await prepareContextUser({ testDb });
    await prepareContextDeclaration({ testDb });
    const declaration = await prepareContextDeclaration({ testDb, saveDeclaration: false });

    const { status, body } = await request(testApp)
      .get(`/api/declaration/${declaration.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(status).toBe(404);
    expect(body.code).toEqual('declaration-not-found');
  });
});
