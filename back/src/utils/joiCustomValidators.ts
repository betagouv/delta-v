import { MeansOfTransport } from '../api/common/enums/meansOfTransport.enum';
import { DeclarationStatus } from '../entities/declaration.entity';

export const validateStatus = (str: string): string => {
  return validateListe(str, Object.values(DeclarationStatus));
};
export const validateMeanOfTransports = (str: string): string => {
  return validateListe(str, Object.values(MeansOfTransport));
};

const validateListe = (str: string, arrayAllowed: string[]): string => {
  const spl: string[] = str.trim().split(',');
  const newSpl = spl.filter((s) => s !== '');
  for (const s of newSpl) {
    if (!arrayAllowed.includes(s as DeclarationStatus)) {
      throw new Error(`${s} is not a good status`);
    }
  }
  return str;
};
