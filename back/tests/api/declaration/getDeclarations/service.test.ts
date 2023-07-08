/* eslint-disable @typescript-eslint/unbound-method */
import { faker } from '@faker-js/faker';

import { declarationEntityFactory } from '../../../helpers/factories/declaration.factory';
import service from '../../../../src/api/declaration/getDeclarations/service';
import { declarationRepositoryMock } from '../../../mocks/declaration.repository.mock';

describe('test getDeclarations service', () => {
  it('should return a valid declaration', async () => {
    const nanoId = faker.string.nanoid(10);
    const declarationRepository = declarationRepositoryMock({
      getAll: [declarationEntityFactory({ publicId: nanoId })],
    });

    const declarations = await service({
      searchPublicId: nanoId.slice(0, 6),
      limit: 10,
      offset: 0,
      declarationRepository,
    });

    expect(declarationRepository.getAll).toBeCalledWith({
      searchPublicId: nanoId.slice(0, 6),
      limit: 10,
      offset: 0,
    });
    expect(declarations).toMatchObject([
      {
        publicId: nanoId,
      },
    ]);
  });
});
