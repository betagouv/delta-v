import { FavoriteEntity } from '../../../entities/favorite.entity';
import {
  SerializedFavorite,
  favoriteSerializer,
} from '../../declaration/common/serializer/favoriteSerializer';

export interface SerializedGetAllFavorite {
  favorites: SerializedFavorite[];
}

export default (favorites: FavoriteEntity[]): SerializedGetAllFavorite => ({
  favorites: favorites.map((favorite) => favoriteSerializer(favorite)),
});
