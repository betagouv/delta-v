import type { Alpha2Code } from 'i18n-iso-countries';
import { getNames } from 'i18n-iso-countries';
import { euCountries } from '../api/common/enums/countries.enum';

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

export const getAlpha2CodeArray = (): Alpha2Code[] => {
  const countries = getNames('fr', { select: 'official' });
  const countriesArray = Object.entries(countries);
  countriesArray.sort((a, b) => a[1].localeCompare(b[1]));
  return countriesArray.map((country) => {
    return country[0] as Alpha2Code;
  });
};

export const generateEnumFromArray = (values: string[]): Record<string, string> => {
  const enumObject: Record<string, string> = {};
  for (const value of values) {
    enumObject[value] = value;
  }
  return enumObject;
};

export const Alpha2CodeEnum = generateEnumFromArray(getAlpha2CodeArray());
