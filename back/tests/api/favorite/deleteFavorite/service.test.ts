/* eslint-disable @typescript-eslint/unbound-method */
import { faker } from '@faker-js/faker';
import { favoriteRepositoryMock } from '../../../mocks/favorite.repository.mock';
import { service } from '../../../../src/api/favorite/deleteFavorite/service';
import { favoriteEntityFactory } from '../../../helpers/factories/favorite.factory';

describe('deleteFavorite service', () => {
  it('should delete favorite correctly', async () => {
    const favoriteRepository = favoriteRepositoryMock({
      getOne: favoriteEntityFactory(),
    });
    const userId = faker.string.uuid();
    const productId = faker.string.uuid();

    await service({
      productId,
      userId,
      favoriteRepository,
    });
    expect(favoriteRepository.getOneByUserIdAndProductId).toBeCalledWith(productId, userId);
    expect(favoriteRepository.deleteOne).toBeCalled();
  });
});
