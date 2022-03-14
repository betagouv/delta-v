import { MeansOfTransport } from '../../common/enums/meansOfTransport.enum';

interface IsFreeFranchiseOptions {
  total: number;
  border: boolean;
  adult: boolean;
  meanOfTransport?: MeansOfTransport;
}

interface GetFranchiseAmountOptions {
  border: boolean;
  adult: boolean;
  meanOfTransport?: MeansOfTransport;
}

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
  adult,
  meanOfTransport = MeansOfTransport.OTHER,
}: GetFranchiseAmountOptions): number => {
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

export const isFreeFranchise = ({
  total,
  border,
  adult,
  meanOfTransport = MeansOfTransport.OTHER,
}: IsFreeFranchiseOptions): boolean => {
  const franchise = getFranchiseAmount({ border, adult, meanOfTransport });
  return total < franchise;
};
