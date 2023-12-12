import { Favorite } from '../../../entities/favorite.entity';
import { FavoriteRepositoryInterface } from '../../../repositories/favorite.repository';

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
    throw new Error('Favorite not found');
  }

  const favorite: Favorite = {
    userId,
    productId,
  };

  await favoriteRepository.deleteOne(favorite);
};
