import request from 'supertest';
import api from '../../../../src/api';
import { prepareContextDeclaration } from '../../../helpers/prepareContext/declaration';
import buildTestApp from '../../../helpers/testApp.helper';
import { testDbManager } from '../../../helpers/testDb.helper';

const testApp = buildTestApp(api);
const testDb = testDbManager();

describe('getOneDeclarations endpoint', () => {
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

    const { status, body } = await request(testApp)
      .get(`/api/declaration`)
      .query({
        searchPublicId: declaration.publicId.slice(0, 6),
      });

    expect(status).toBe(200);
    expect(body.declarations).toMatchObject([
      {
        publicId: declaration.publicId,
      },
    ]);
  });
  it('should return 200 with empty array', async () => {
    await prepareContextDeclaration({ testDb });
    const declaration = await prepareContextDeclaration({ testDb, saveDeclaration: false });

    const { status, body } = await request(testApp)
      .get(`/api/declaration`)
      .query({
        searchPublicId: `${declaration.publicId.slice(0, 6)}ABC`,
      });

    expect(status).toBe(200);
    expect(body.declarations).toEqual([]);
  });
});
