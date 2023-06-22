import { ResponseCodes } from '../../common/enums/responseCodes.enum';

export interface SerializedRefreshCurrencies {
  message: string;
  code: ResponseCodes;
}

export const serializer = (): SerializedRefreshCurrencies => {
  return {
    message: 'Monnaies mises à jour avec succès',
    code: ResponseCodes.CURRENCIES_UPDATED,
  };
};
