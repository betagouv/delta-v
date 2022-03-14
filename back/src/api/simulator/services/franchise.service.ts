interface IsFreeFranchiseOptions {
  total: number;
  border: boolean;
  adult: boolean;
}

interface GetFranchiseAmountOptions {
  border: boolean;
  adult: boolean;
}

export const getFranchiseAmount = ({ border, adult }: GetFranchiseAmountOptions): number => {
  if (border) {
    if (adult) {
      return 75;
    } else {
      return 40;
    }
  } else {
    if (adult) {
      return 300;
    } else {
      return 150;
    }
  }
};

export const isFreeFranchise = ({ total, border, adult }: IsFreeFranchiseOptions): boolean => {
  const franchise = getFranchiseAmount({ border, adult });
  return total < franchise;
};
