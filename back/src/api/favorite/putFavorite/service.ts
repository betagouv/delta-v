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
}: FavoriteOptions): Promise<void> =>
  await favoriteRepository.createOne({
    userId,
    productId,
  });
