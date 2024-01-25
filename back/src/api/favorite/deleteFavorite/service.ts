import { FavoriteRepositoryInterface } from '../../../repositories/favorite.repository';
import favoriteNotFoundError from '../../common/errors/favoriteNotFound.error';

interface FavoriteOptions {
  userId: string;
  productId: string;
  favoriteRepository: FavoriteRepositoryInterface;
}

export const service = async ({
  userId,
  productId,
  favoriteRepository,
}: FavoriteOptions): Promise<void> => {
  const favoriteExists = await favoriteRepository.getOneByUserIdAndProductId(productId, userId);

  if (!favoriteExists) {
    throw favoriteNotFoundError();
  }

  await favoriteRepository.deleteOne({
    userId,
    productId,
    name: favoriteExists.name,
  });
};
