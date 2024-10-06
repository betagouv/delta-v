export const calculateRefreshTokenExpiry = (): number => {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);

  const expirationDate = new Date(now.getTime() + 7 * 60 * 1000);

  return Math.floor(expirationDate.getTime());
};
