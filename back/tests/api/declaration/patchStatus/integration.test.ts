import request from 'supertest';
import api from '../../../../src/api';
import { prepareContextDeclaration } from '../../../helpers/prepareContext/declaration';
import buildTestApp from '../../../helpers/testApp.helper';
import { testDbManager } from '../../../helpers/testDb.helper';
import { DeclarationStatus } from '../../../../src/entities/declaration.entity';
import { ResponseCodes } from '../../../../src/api/common/enums/responseCodes.enum';
import { prepareContextUser } from '../../../helpers/prepareContext/user';

const testApp = buildTestApp(api);
const testDb = testDbManager();

describe('patchStatus endpoint', () => {
  beforeAll(async () => {
    await testDb.connect();
  });

  beforeEach(async () => {
    await testDb.clear();
  });

  afterAll(async () => {
    await testDb.disconnect();
  });
  it('should change declaration status', async () => {
    const { accessToken } = await prepareContextUser({ testDb });
    await prepareContextDeclaration({ testDb });
    const declaration = await prepareContextDeclaration({
      testDb,
      dataDeclaration: { status: DeclarationStatus.DRAFT },
    });

    const { status, body } = await request(testApp)
      .patch(`/api/declaration/${declaration.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        status: DeclarationStatus.SUBMITTED,
      });

    expect(status).toBe(200);
    expect(body.code).toEqual(ResponseCodes.DECLARATION_STATUS_UPDATED);

    const updatedDeclaration = (await testDb.getDeclarations()).find(
      ({ id }) => id === declaration.id,
    );
    expect(updatedDeclaration?.status).toEqual(DeclarationStatus.SUBMITTED);
  });
  it('should return a 404 error if the declaration does not exist', async () => {
    const { accessToken } = await prepareContextUser({ testDb });
    await prepareContextDeclaration({ testDb });
    const declaration = await prepareContextDeclaration({ testDb, saveDeclaration: false });

    const { status, body } = await request(testApp)
      .patch(`/api/declaration/${declaration.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        status: DeclarationStatus.SUBMITTED,
      });

    expect(status).toBe(404);
    expect(body.code).toEqual('declaration-not-found');
  });
});
