import { faker } from '@faker-js/faker';

import { declarationEntityFactory } from '../../../helpers/factories/declaration.factory';
import service from '../../../../src/api/declaration/getDeclaration/service';
import { declarationRepositoryMock } from '../../../mocks/declaration.repository.mock';
import { ErrorCodes } from '../../../../src/api/common/enums/errorCodes.enum';

describe('test getDeclaration service', () => {
  it('should return a valid declaration', async () => {
    const uuid = faker.datatype.uuid();
    const declarationRepository = declarationRepositoryMock({
      getOne: declarationEntityFactory({ id: uuid }),
    });

    const declaration = await service({
      declarationId: uuid,
      declarationRepository,
    });

    expect(declaration).toMatchObject({
      id: uuid,
    });
  });

  it("should fail when ticket doesn't exist", async () => {
    const uuid = faker.datatype.uuid();
    const declarationRepository = declarationRepositoryMock({
      getOne: undefined,
    });

    await expect(
      service({
        declarationId: uuid,
        declarationRepository,
      }),
    ).rejects.toMatchObject({
      code: ErrorCodes.DECLARATION_NOT_FOUND,
    });
  });
});
