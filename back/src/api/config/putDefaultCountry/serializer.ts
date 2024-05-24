import { ResponseCodes } from '../../common/enums/responseCodes.enum';

export interface PutDefaultCountryResponse {
  message: string;
  code: ResponseCodes;
}

export const serializePutDefaultCountry = (): PutDefaultCountryResponse => ({
  message: 'Pays par défaut modifié',
  code: ResponseCodes.DEFAULT_COUNTRY_UPDATED,
});
