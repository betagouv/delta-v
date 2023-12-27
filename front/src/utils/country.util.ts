import { useMemo } from 'react';

import { getEmojiFlag } from 'countries-list';
import { Alpha2Code, getNames } from 'i18n-iso-countries';

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

export const memoizedCountriesOptions = (
  countriesAlternatives: CountryAlternative[],
  disabledCountries: Alpha2Code[],
  withFlag?: boolean,
): MemoizedCountry[] => {
  const memoizedCountries = useMemo(() => {
    const countries = getNames('fr', { select: 'official' });
    const keys = Object.keys(countries) as Alpha2Code[];
    const enabledKeys = keys.filter((key) => !disabledCountries.includes(key));
    return enabledKeys.map((key) => {
      const countryAlternative = countriesAlternatives.find((country) => country.id === key);
      return {
        value: withFlag
          ? `${countries[key]} ${getEmojiFlag(key).toString()} `
          : countries[key] ?? '',
        id: key,
        alternatives: countryAlternative?.alternatives ?? [],
      };
    });
  }, [countriesAlternatives, disabledCountries]);

  return memoizedCountries;
};
