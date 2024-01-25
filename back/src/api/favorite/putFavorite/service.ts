import { FavoriteRepositoryInterface } from '../../../repositories/favorite.repository';

interface FavoriteOptions {
  userId: string;
  productId: string;
  name: string;
  favoriteRepository: FavoriteRepositoryInterface;
}

export const service = async ({
  userId,
  productId,
  name,
  favoriteRepository,
}: FavoriteOptions): Promise<void> =>
  await favoriteRepository.createOne({
    userId,
    productId,
    name,
  });
