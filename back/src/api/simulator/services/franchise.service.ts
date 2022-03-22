import { MeansOfTransport } from '../../common/enums/meansOfTransport.enum';

interface IsFreeFranchiseOptions {
  total: number;
  border: boolean;
  age: number;
  meanOfTransport?: MeansOfTransport;
}

interface GetFranchiseAmountOptions {
  border: boolean;
  age: number;
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

export const getFranchiseAmount = ({
  border,
  age,
  meanOfTransport = MeansOfTransport.OTHER,
}: GetFranchiseAmountOptions): number => {
  if (border) {
    if (age > ADULT_AGE) {
      return 75;
    } else {
      return 40;
    }
  } else {
    if (age > ADULT_AGE) {
      return getFranchiseForAdultNotBorder(meanOfTransport);
    } else {
      return 150;
    }
  }
};

export const isFreeFranchise = ({
  total,
  border,
  age,
  meanOfTransport = MeansOfTransport.OTHER,
}: IsFreeFranchiseOptions): boolean => {
  const franchise = getFranchiseAmount({ border, age, meanOfTransport });
  return total < franchise;
};
