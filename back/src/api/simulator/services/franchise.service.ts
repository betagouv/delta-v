interface IsFreeFranchiseOptions {
  total: number;
  border: boolean;
}

interface GetFranchiseAmountOptions {
  border: boolean;
}

export const getFranchiseAmount = ({ border }: GetFranchiseAmountOptions): number => {
  if (border) {
    return 75;
  }

  return 300;
};

export const isFreeFranchise = ({ total, border }: IsFreeFranchiseOptions): boolean => {
  const franchise = getFranchiseAmount({ border });
  return total < franchise;
};
