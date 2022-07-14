import { Alpha2Code } from 'i18n-iso-countries';
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
