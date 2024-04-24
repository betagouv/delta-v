import { isValidPhoneNumber } from 'react-phone-number-input';

export function isValidPhone(value: string): boolean {
  return isValidPhoneNumber(value);
}
