// eslint-disable-next-line import/no-extraneous-dependencies
import { customAlphabet } from 'nanoid';

export const generatePublicId = (): string => {
  const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 10);
  return nanoid();
};
