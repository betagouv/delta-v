import type { Alpha2Code } from 'i18n-iso-countries';
import { CountryType, getCountryType } from '../../../../utils/country.util';
import { MeansOfTransport } from '../../../common/enums/meansOfTransport.enum';

interface GetFranchiseAmountOptions {
  border: boolean;
  age: number;
  country: Alpha2Code;
  meanOfTransport?: MeansOfTransport;
}

const ADULT_AGE = 15;

const getFranchiseForAdultNotBorder = (meanOfTransport: MeansOfTransport): number => {
  switch (meanOfTransport) {
    case MeansOfTransport.PLANE:
      return 430;
    case MeansOfTransport.BOAT:
      return 430;
    case MeansOfTransport.CAR:
      return 300;
    case MeansOfTransport.TRAIN:
      return 300;
    case MeansOfTransport.OTHER:
      return 300;
  }
};

const isAdult = (age: number): boolean => {
  return age >= ADULT_AGE;
};

export const getFranchiseAmount = ({
  border,
  age,
  country,
  meanOfTransport = MeansOfTransport.OTHER,
}: GetFranchiseAmountOptions): number => {
  const countryType = getCountryType(country);
  const adult = isAdult(age);
  if (countryType === CountryType.EU) {
    return Infinity;
  }

  if (countryType === CountryType.ANDORRA) {
    if (adult) {
      return 900;
    }
    return 450;
  }

  if (border) {
    if (adult) {
      return 75;
    } else {
      return 40;
    }
  } else {
    if (adult) {
      return getFranchiseForAdultNotBorder(meanOfTransport);
    } else {
      return 150;
    }
  }
};
