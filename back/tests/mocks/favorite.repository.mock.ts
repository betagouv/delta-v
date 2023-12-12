import { Favorite } from '../../src/entities/favorite.entity';
import { AppDataSource } from '../../src/loader/database';
import {
  FavoriteRepository,
  FavoriteRepositoryInterface,
} from '../../src/repositories/favorite.repository';

interface FavoriteRepositoryMockOptions {
  getOne?: Favorite;
  getAll?: Favorite[];
}

export const favoriteRepositoryMock = (
  options: FavoriteRepositoryMockOptions,
): FavoriteRepositoryInterface => {
  const favoriteRepository = AppDataSource.manager.withRepository(FavoriteRepository);
  favoriteRepository.createOne = jest.fn().mockResolvedValue(undefined);
  favoriteRepository.deleteOne = jest.fn().mockResolvedValue(undefined);
  favoriteRepository.getOneByUserIdAndProductId = jest.fn().mockResolvedValue(options.getOne);
  favoriteRepository.getAll = jest.fn().mockResolvedValue(options.getAll);
  return favoriteRepository;
};
