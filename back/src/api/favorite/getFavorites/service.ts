import { FavoriteEntityInterface } from '../../../entities/favorite.entity';
import { FavoriteRepositoryInterface } from '../../../repositories/favorite.repository';

export interface IGetOneFavoriteServiceOptions {
  userId: string;
  favoriteRepository: FavoriteRepositoryInterface;
}

export default async ({
  userId,
  favoriteRepository,
}: IGetOneFavoriteServiceOptions): Promise<FavoriteEntityInterface[]> => {
  const favorites = await favoriteRepository.getAll(userId);

  return favorites;
};
