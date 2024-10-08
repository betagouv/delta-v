export const calculateRefreshTokenExpiry = (): number => {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);

  let expirationDate: Date;

  if (now.getHours() < 12) {
    // Avant midi : expiration dans 12 heures
    expirationDate = new Date(now.getTime() + 12 * 60 * 60 * 1000);
  } else {
    // Après midi : expiration à minuit
    expirationDate = midnight;
  }

  // Retourner le timestamp d'expiration en secondes
  return Math.floor(expirationDate.getTime());
};
