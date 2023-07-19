import axios from 'axios';
import currencyServerUnavailableError from '../../../common/errors/currencyServerUnavailable.error';
import { RawCurrency } from './currencySerializer.service';

export const getRawCurrencies = async (): Promise<RawCurrency[]> => {
  try {
    const response = await axios.get(
      'https://ec.europa.eu/budg/inforeuro/api/public/monthly-rates?lang=FR',
    );

    return response.data;
  } catch (error) {
    throw currencyServerUnavailableError(error ?? 'Unknown error');
  }
};
