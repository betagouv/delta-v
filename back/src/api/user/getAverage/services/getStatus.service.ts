export enum Status {
  ACCEPTED = 'accepted',
  CATCH_UP = 'catch-up',
  REFUSED = 'refused',
}

export const getStatus = (value: number): Status => {
  if (value >= 10) {
    return Status.ACCEPTED;
  } else if (value >= 8) {
    return Status.CATCH_UP;
  }

  return Status.REFUSED;
};
