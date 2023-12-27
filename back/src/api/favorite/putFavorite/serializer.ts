import { ResponseCodes } from '../../common/enums/responseCodes.enum';

export interface PutFavoriteResponse {
  message: string;
  code: ResponseCodes;
}

export const serializePutFavorite = (): PutFavoriteResponse => ({
  message: 'Favoris ajouté',
  code: ResponseCodes.FAVORITE_ADDED,
});
