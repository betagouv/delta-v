import { escapeRegExp } from 'lodash';

export const searchRegex = (search: string) => {
  const safeKey = escapeRegExp(search);
  return new RegExp(`(${safeKey})`, 'gi');
};
