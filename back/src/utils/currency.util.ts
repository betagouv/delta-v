import { Currency } from '../entities/currency.entity';

export const sortCurrencies = (currencyA: Currency, currencyB: Currency): number => {
  return currencyA.name.localeCompare(currencyB.name);
};
