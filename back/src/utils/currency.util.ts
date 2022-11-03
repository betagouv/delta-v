import { Currency } from '../entities/currency.entity';

export const sortCurrencies = (currencyA: Currency, currencyB: Currency): number => {
  return currencyA.id.localeCompare(currencyB.id);
};
