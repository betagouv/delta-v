import type { Alpha2Code } from 'i18n-iso-countries';

export const euCountries: Alpha2Code[] = [
  'BE',
  'BG',
  'CZ',
  'DK',
  'DE',
  'EE',
  'IE',
  'GR',
  'ES',
  'FR',
  'HR',
  'IT',
  'CY',
  'LV',
  'LT',
  'LU',
  'HU',
  'MT',
  'NL',
  'AT',
  'PL',
  'PT',
  'RO',
  'SI',
  'SK',
  'FI',
  'SE',
];

export enum CountryType {
  EU,
  NON_EU,
  ANDORRA,
}

export const getCountryType = (country: Alpha2Code): CountryType => {
  if (euCountries.includes(country)) {
    return CountryType.EU;
  }
  if (country === 'AD') {
    return CountryType.ANDORRA;
  }
  return CountryType.NON_EU;
};

export type CountryAlternative = {
  id: string;
  alternatives: string[];
};

export type MemoizedCountry = {
  value: string;
  id: Alpha2Code;
  alternatives: string[];
};
