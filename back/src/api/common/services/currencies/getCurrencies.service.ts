import { Currency } from '../../../../entities/currency.entity';
import { CurrencyRepositoryInterface } from '../../../../repositories/currency.repository';
import currencyNotFoundError from '../../errors/currencyNotFound.error';
import { ShoppingProduct } from '../shoppingProducts';

interface GetAllMatchingCurrenciesOptions {
  shoppingProducts: ShoppingProduct[];
  currencyRepository: CurrencyRepositoryInterface;
}

export const getAllMatchingCurrencies = async ({
  shoppingProducts,
  currencyRepository,
}: GetAllMatchingCurrenciesOptions): Promise<Currency[]> => {
  const currencyIds = shoppingProducts
    .map(({ currency }) => currency)
    .filter((currency) => currency) as string[];
  const uniqueCurrencyIds = [...new Set(currencyIds)];

  const currencies = await currencyRepository.getManyByIds(uniqueCurrencyIds);

  if (uniqueCurrencyIds.length !== currencies.length) {
    throw currencyNotFoundError();
  }

  return currencies;
};
