import { FavoriteEntityInterface } from '../../../src/entities/favorite.entity';
import { favoriteEntityFactory } from '../factories/favorite.factory';
import { ITestDbManager } from '../testDb.helper';

interface IPrepareContextFavoriteOptions {
  testDb: ITestDbManager;
  dataFavorite?: Partial<FavoriteEntityInterface>;
  saveFavorite?: boolean;
}

export const prepareContextFavorite = async ({
  testDb,
  dataFavorite = {},
  saveFavorite = true,
}: IPrepareContextFavoriteOptions): Promise<FavoriteEntityInterface> => {
  const favorite = favoriteEntityFactory(dataFavorite);

  if (saveFavorite) {
    await testDb.persistFavorite(favorite);
  }

  return favorite;
};
