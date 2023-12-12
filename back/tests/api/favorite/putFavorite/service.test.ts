/* eslint-disable @typescript-eslint/unbound-method */
import { faker } from '@faker-js/faker';
import { favoriteRepositoryMock } from '../../../mocks/favorite.repository.mock';
import { service } from '../../../../src/api/favorite/putFavorite/service';

describe('putFavorite service', () => {
  it('should put favorite correctly', async () => {
    const favoriteRepository = favoriteRepositoryMock({});
    const userId = faker.string.uuid();
    const productId = faker.string.uuid();

    await service({
      productId,
      userId,
      favoriteRepository,
    });
    expect(favoriteRepository.getOneByUserIdAndProductId).toBeCalledWith(productId, userId);
    expect(favoriteRepository.createOne).toBeCalled();
  });
});
