import request from 'supertest';
import api from '../../../../src/api';
import { prepareContextDeclaration } from '../../../helpers/prepareContext/declaration';
import buildTestApp from '../../../helpers/testApp.helper';
import { testDbManager } from '../../../helpers/testDb.helper';
import { DeclarationStatus } from '../../../../src/entities/declaration.entity';
import { ResponseCodes } from '../../../../src/api/common/enums/responseCodes.enum';

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
    await prepareContextDeclaration({ testDb });
    const declaration = await prepareContextDeclaration({
      testDb,
      dataDeclaration: { status: DeclarationStatus.DRAFT },
    });

    const { status, body } = await request(testApp)
      .patch(`/api/declaration/${declaration.id}`)
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
    await prepareContextDeclaration({ testDb });
    const declaration = await prepareContextDeclaration({ testDb, saveDeclaration: false });

    const { status, body } = await request(testApp)
      .patch(`/api/declaration/${declaration.id}`)
      .send({
        status: DeclarationStatus.SUBMITTED,
      });

    expect(status).toBe(404);
    expect(body.code).toEqual('declaration-not-found');
  });
});
