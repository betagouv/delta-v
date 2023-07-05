/* eslint-disable @typescript-eslint/unbound-method */
import { faker } from '@faker-js/faker';

import { newsEntityFactory } from '../../../helpers/factories/news.factory';
import service from '../../../../src/api/actuality/getActualities/service';
import { actualityRepositoryMock } from '../../../mocks/actuality.repository.mock';

describe('test getActualities service', () => {
  it('should return a valid actuality', async () => {
    const uuid = faker.string.uuid();
    const title = faker.lorem.sentence();
    const content = faker.lorem.paragraph();
    const actualityRepository = actualityRepositoryMock({
      getAll: [newsEntityFactory({ id: uuid, title, content })],
    });

    const actualities = await service({
      search: title.slice(1, 5),
      limit: 10,
      offset: 0,
      actualityRepository,
    });

    expect(actualityRepository.getAll).toBeCalledWith({
      search: title.slice(1, 5),
      limit: 10,
      offset: 0,
    });
    expect(actualities).toMatchObject([
      {
        id: uuid,
        title,
        content,
      },
    ]);
  });
});
