import { escapeRegExp } from 'lodash';

export const searchRegex = (search: string) => {
  const safeKey = escapeRegExp(search);
  return new RegExp(`(${safeKey})`, 'gi');
};

export const passwordRegex =
  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
