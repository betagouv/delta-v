import { useMemo } from 'react';

import { getEmojiFlag } from 'countries-list';
import type { Alpha2Code } from 'i18n-iso-countries';
import { getNames } from 'i18n-iso-countries';

import { CountryAlternative } from '@/utils/country.util';

type MemoizedCountriesType = {
  label: string;
  value: string;
  tags: string[];
};

export const memoizedCountriesData = ({
  countriesAlternatives,
  disabledCountries,
  withFlag = true,
}: {
  countriesAlternatives: CountryAlternative[];
  disabledCountries: Alpha2Code[];
  withFlag?: boolean;
}): MemoizedCountriesType[] => {
  const memoizedCountries = useMemo(() => {
    const countries = getNames('fr', { select: 'official' });
    const countriesArray = Object.entries(countries);
    countriesArray.sort((a, b) => a[1].localeCompare(b[1]));
    const keys = countriesArray.map((country) => {
      return country[0] as Alpha2Code;
    });
    const enabledKeys = keys.filter((key) => !disabledCountries.includes(key));
    return enabledKeys.map((key) => {
      const label = countries[key] ?? '';
      const countryAlternative = countriesAlternatives.find((country) => country.id === key);
      return {
        label: `${label}${withFlag && ` ${getEmojiFlag(key).toString()}`}`,
        value: key,
        tags: countryAlternative?.alternatives ?? [],
      };
    });
  }, [countriesAlternatives, disabledCountries]);

  return memoizedCountries;
};
