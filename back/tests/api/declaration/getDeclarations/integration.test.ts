import request from 'supertest';
import api from '../../../../src/api';
import { prepareContextDeclaration } from '../../../helpers/prepareContext/declaration';
import buildTestApp from '../../../helpers/testApp.helper';
import { testDbManager } from '../../../helpers/testDb.helper';
import { DeclarationEntityInterface } from '../../../../src/entities/declaration.entity';
import { prepareContextUser } from '../../../helpers/prepareContext/user';

const testApp = buildTestApp(api);
const testDb = testDbManager();

describe('getDeclarations endpoint', () => {
  beforeAll(async () => {
    await testDb.connect();
  });

  beforeEach(async () => {
    await testDb.clear();
  });

  afterAll(async () => {
    await testDb.disconnect();
  });
  it('should return a list of declarations', async () => {
    const { accessToken } = await prepareContextUser({ testDb });
    await prepareContextDeclaration({ testDb });
    const declaration = await prepareContextDeclaration({ testDb });

    const { status, body } = await request(testApp)
      .get(`/api/declaration`)
      .set('Authorization', `Bearer ${accessToken}`)
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
  it('should return a declaration', async () => {
    const { accessToken } = await prepareContextUser({ testDb });
    const dataDeclaration: Partial<DeclarationEntityInterface> = {
      publicId: `AZERTYUIOP`,
      declarantEmail: 'pVAZERTYUIOPz@example.com',
      declarantFirstName: 'JoAZERTYUIOPhn',
      declarantLastName: 'JoAZERTYUIOP',
    };

    const declaration = [];
    declaration.push(
      await prepareContextDeclaration({
        testDb,
        dataDeclaration,
      }),
    );

    declaration.push(
      await prepareContextDeclaration({
        testDb,
        dataDeclaration: {
          ...dataDeclaration,
          publicId: `QSDFGHJKLM`,
        },
      }),
    );
    declaration.push(
      await prepareContextDeclaration({
        testDb,
        dataDeclaration: {
          ...dataDeclaration,
          declarantEmail: 'pVQSDFGHJKLMz@example.com',
          publicId: `A1ERTYUIOP`,
        },
      }),
    );
    declaration.push(
      await prepareContextDeclaration({
        testDb,
        dataDeclaration: {
          ...dataDeclaration,
          declarantFirstName: 'JOQSDFGHJKLM',
          publicId: `A2ERTYUIOP`,
        },
      }),
    );

    declaration.push(
      await prepareContextDeclaration({
        testDb,
        dataDeclaration: {
          ...dataDeclaration,
          declarantEmail: 'JOQSDFGHJKLMhn',
          publicId: `A3ERTYUIOP`,
        },
      }),
    );
    const { status, body } = await request(testApp)
      .get(`/api/declaration`)
      .set('Authorization', `Bearer ${accessToken}`)
      .query({
        search: 'QSDFGHJKLM',
      });

    expect(status).toBe(200);
    expect(body.declarations.length).toBe(4);
    expect(body.declarations).not.toContain(declaration[0]);
  });
  it('should return 200 with empty array', async () => {
    const { accessToken } = await prepareContextUser({ testDb });
    await prepareContextDeclaration({ testDb });
    const declaration = await prepareContextDeclaration({ testDb, saveDeclaration: false });

    const { status, body } = await request(testApp)
      .get(`/api/declaration`)
      .set('Authorization', `Bearer ${accessToken}`)
      .query({
        searchPublicId: `${declaration.publicId.slice(0, 4)}ABC`,
      });

    expect(status).toBe(200);
    expect(body.declarations).toEqual([]);
  });
});
