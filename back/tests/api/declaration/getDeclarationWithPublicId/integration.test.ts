import request from 'supertest';
import api from '../../../../src/api';
import { prepareContextDeclaration } from '../../../helpers/prepareContext/declaration';
import buildTestApp from '../../../helpers/testApp.helper';
import { testDbManager } from '../../../helpers/testDb.helper';

const testApp = buildTestApp(api);
const testDb = testDbManager();

describe('getOneDeclarationWithPublicId endpoint', () => {
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

    const { status, body } = await request(testApp).get(
      `/api/declaration/public/${declaration.publicId}`,
    );

    expect(status).toBe(200);
    expect(body).toMatchObject({
      declaration: {
        publicId: declaration.publicId,
      },
    });
  });
  it('should return a 404 error if the declaration does not exist', async () => {
    await prepareContextDeclaration({ testDb });
    const declaration = await prepareContextDeclaration({ testDb, saveDeclaration: false });

    const { status, body } = await request(testApp).get(
      `/api/declaration/public/${declaration.publicId}`,
    );

    expect(status).toBe(404);
    expect(body.code).toEqual('declaration-not-found');
  });
});
