import { Currency } from '../../../../entities/currency.entity';

export interface RawCurrency {
  country: string;
  currency: string;
  isoA3Code: string;
  isoA2Code: string;
  value: number;
  comment: string | null;
}

export const serializeCurrency = (rawCurrency: RawCurrency): Currency => {
  return {
    id: rawCurrency.isoA3Code,
    name: rawCurrency.currency,
    value: rawCurrency.value,
    comment: rawCurrency.comment ?? undefined,
    updateDate: new Date(),
  };
};
