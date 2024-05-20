import { useMemo } from 'react';

import { getEmojiFlag } from 'countries-list';
import { Alpha2Code, getNames } from 'i18n-iso-countries';

import { Suggestion } from '@/components/forms/custom/AutocompleteInput/utils';
import { CountryAlternative } from '@/utils/country.util';

export const memoizedCountriesOptions = (
  countriesAlternatives: CountryAlternative[],
  disabledCountries: Alpha2Code[],
): Suggestion[] => {
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
        label: `${label} ${getEmojiFlag(key).toString()}`,
        value: key,
        tags: countryAlternative?.alternatives ?? [],
      };
    });
  }, [countriesAlternatives, disabledCountries]);

  return memoizedCountries;
};
