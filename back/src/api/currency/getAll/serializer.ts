import { Currency } from '../../../entities/currency.entity';
import { sortCurrencies } from '../../../utils/currency.util';
import { currencySerializer, SerializedCurrency } from '../common/serializer';

export interface SerializedGetAllCurrencies {
  currencies: SerializedCurrency[];
}

export const serializer = (currencies: Currency[]): SerializedGetAllCurrencies => {
  return {
    currencies: currencies.sort(sortCurrencies).map(currencySerializer),
  };
};
