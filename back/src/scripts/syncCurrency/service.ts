import { CurrencyRepositoryInterface } from '../../repositories/currency.repository';
import { serializeCurrency } from './services/currencySerializer.service';
import { getRawCurrencies } from './services/getRawCurrencies.service';

export const service = async (currencyRepository: CurrencyRepositoryInterface): Promise<void> => {
  const rawCurrencies = await getRawCurrencies();
  if (rawCurrencies.length === 0) {
    return;
  }

  const currencies = rawCurrencies.map(serializeCurrency);

  await currencyRepository.saveAll(currencies);
};
