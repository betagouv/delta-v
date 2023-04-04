import { faker } from '@faker-js/faker';

import { declarationEntityFactory } from '../../../helpers/factories/declaration.factory';
import service from '../../../../src/api/declaration/getDeclaration/service';
import { declarationRepositoryMock } from '../../../mocks/declaration.repository.mock';
import { IAppError } from '../../../../src/core/buildError';
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
      declaration: {
        id: uuid,
      },
    });
  });

  it("should fail when ticket doesn't exists", async () => {
    const uuid = faker.datatype.uuid();
    const declarationRepository = declarationRepositoryMock({
      getOne: undefined,
    });

    expect.assertions(1);

    try {
      await service({
        declarationId: uuid,
        declarationRepository,
      });
    } catch (error) {
      const appError = error as IAppError;
      expect(appError.code).toBe(ErrorCodes.DECLARATION_NOT_FOUND);
    }
  });
});
