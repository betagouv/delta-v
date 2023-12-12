import { Repository } from 'typeorm';
import { AppDataSource } from '../loader/database';
import { Favorite, FavoriteEntity } from '../entities/favorite.entity';

export interface GetAllFavoritesOptions {
  userId: string;
  limit: number;
  offset: number;
}

export type FavoriteRepositoryInterface = {
  createOne(favorite: Favorite): Promise<void>;
  deleteOne(favorite: Favorite): Promise<void>;
  getAll(userId: string): Promise<Favorite[]>;
  getOneByUserIdAndProductId(productId: string, userId: string): Promise<Favorite | null>;
} & Repository<FavoriteEntity>;

export const FavoriteRepository: FavoriteRepositoryInterface = AppDataSource.getRepository(
  FavoriteEntity,
).extend({
  async createOne(favorite: Favorite): Promise<void> {
    await this.save(favorite);
  },

  async deleteOne(favorite: Favorite): Promise<void> {
    await this.remove(favorite);
  },

  async getAll(userId: string): Promise<Favorite[]> {
    return await this.createQueryBuilder('favorite')
      .where('favorite.userId = :userId', { userId })
      .getMany();
  },

  async getOneByUserIdAndProductId(productId: string, userId: string): Promise<Favorite | null> {
    return await this.createQueryBuilder('favorite')
      .where('favorite.userId = :userId', { userId })
      .where('favorite.productId = :productId', { productId })
      .getOne();
  },
});
