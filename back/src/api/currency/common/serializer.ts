import { Currency } from '../../../entities/currency.entity';

export interface SerializedCurrency {
  id: string;
  name: string;
  value: number;
}

export const currencySerializer = (currency: Currency): SerializedCurrency => ({
  id: currency.id,
  name: currency.name,
  value: currency.value,
});
