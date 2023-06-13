import { faker } from '@faker-js/faker';

import { declarationEntityFactory } from '../../../helpers/factories/declaration.factory';
import service from '../../../../src/api/declaration/getDeclarationWithPublicId/service';
import { declarationRepositoryMock } from '../../../mocks/declaration.repository.mock';
import { ErrorCodes } from '../../../../src/api/common/enums/errorCodes.enum';

describe('test getDeclaration service', () => {
  it('should return a valid declaration', async () => {
    const nanoId = faker.string.nanoid();
    const declarationRepository = declarationRepositoryMock({
      getOneWithPublicId: declarationEntityFactory({ publicId: nanoId }),
    });

    const declaration = await service({
      publicDeclarationId: nanoId,
      declarationRepository,
    });

    expect(declaration).toMatchObject({
      publicId: nanoId,
    });
  });

  it("should fail when ticket doesn't exist", async () => {
    const nanoId = faker.string.nanoid();
    const declarationRepository = declarationRepositoryMock({
      getOneWithPublicId: undefined,
    });

    await expect(
      service({
        publicDeclarationId: nanoId,
        declarationRepository,
      }),
    ).rejects.toMatchObject({
      code: ErrorCodes.DECLARATION_NOT_FOUND,
    });
  });
});
