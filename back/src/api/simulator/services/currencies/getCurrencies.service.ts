import { Currency } from '../../../../entities/currency.entity';
import { CurrencyRepositoryInterface } from '../../../../repositories/currency.repository';
import currencyNotFoundError from '../../../common/errors/currencyNotFound.error';

interface GetCurrenciesOptions {
  currencyIds: string[];
  currencyRepository: CurrencyRepositoryInterface;
}

export const getCurrencies = async ({
  currencyIds,
  currencyRepository,
}: GetCurrenciesOptions): Promise<Currency[]> => {
  const currencies = await currencyRepository.getManyByIds(currencyIds);
  if (currencyIds.length !== currencies.length) {
    throw currencyNotFoundError();
  }

  return currencies;
};
