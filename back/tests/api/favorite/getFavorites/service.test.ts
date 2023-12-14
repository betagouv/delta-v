/* eslint-disable @typescript-eslint/unbound-method */
import { faker } from '@faker-js/faker';
import { favoriteRepositoryMock } from '../../../mocks/favorite.repository.mock';
import { service } from '../../../../src/api/favorite/getFavorites/service';

describe('getFavorite service', () => {
  it('should get favorite correctly', async () => {
    const favoriteRepository = favoriteRepositoryMock({});
    const userId = faker.string.uuid();

    await service({
      userId,
      favoriteRepository,
    });
    expect(favoriteRepository.getAll).toBeCalledWith(userId);
  });
});
