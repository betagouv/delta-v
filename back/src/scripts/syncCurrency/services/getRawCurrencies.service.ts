import currencyServerUnavailableError from '../../../api/common/errors/currencyServerUnavailable.error';
import { RawCurrency } from './currencySerializer.service';

export const getRawCurrencies = async (): Promise<RawCurrency[]> => {
  try {
    const response = await fetch(
      'https://ec.europa.eu/budg/inforeuro/api/public/monthly-rates?lang=FR',
    );

    return response.json();
  } catch (error) {
    throw currencyServerUnavailableError();
  }
};
