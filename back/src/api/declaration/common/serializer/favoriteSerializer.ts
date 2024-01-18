import { Favorite } from '../../../../entities/favorite.entity';

export interface SerializedFavorite {
  productId: string;
  name?: string;
}

export const favoriteSerializer = (favorite: Favorite): SerializedFavorite => ({
  productId: favorite.productId,
  name: favorite.name,
});
