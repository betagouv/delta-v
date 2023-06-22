import { CurrencyRepositoryInterface } from '../../../repositories/currency.repository';
import { serializeCurrency } from '../common/services/currencySerializer.service';
import { getRawCurrencies } from '../common/services/getRawCurrencies.service';

interface GetAllCurrenciesService {
  currencyRepository: CurrencyRepositoryInterface;
}

export const service = async ({ currencyRepository }: GetAllCurrenciesService): Promise<void> => {
  const rawCurrencies = await getRawCurrencies();
  if (rawCurrencies.length === 0) {
    return;
  }

  const currencies = rawCurrencies.map(serializeCurrency);

  await currencyRepository.saveAll(currencies);
};
