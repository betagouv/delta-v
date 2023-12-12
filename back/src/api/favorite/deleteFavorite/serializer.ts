import { ResponseCodes } from '../../common/enums/responseCodes.enum';

export interface DeleteFavoriteResponse {
  message: string;
  code: ResponseCodes;
}

export const serializeDeleteFavorite = (): DeleteFavoriteResponse => ({
  message: 'Favoris supprimé',
  code: ResponseCodes.FAVORITE_DELETED,
});
