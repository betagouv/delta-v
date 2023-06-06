// eslint-disable-next-line import/no-extraneous-dependencies
import { customAlphabet } from 'nanoid/async';

export const generatePublicId = async (): Promise<string> => {
  const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 21);
  return await nanoid();
};
