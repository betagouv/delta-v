import crypto from 'crypto';

export const generateRandomString = (length = 32): string => {
  return crypto.randomBytes(length).toString('hex');
};
