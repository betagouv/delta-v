import { FavoriteEntity } from '../../../entities/favorite.entity';

export interface SerializedGetAllFavorite {
  favorites: string[];
}

export default (favorites: FavoriteEntity[]): SerializedGetAllFavorite => ({
  favorites: favorites.map((favorites) => favorites.productId),
});
