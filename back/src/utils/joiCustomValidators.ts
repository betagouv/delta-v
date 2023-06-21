import { DeclarationStatus } from '../entities/declaration.entity';

export function validateStatus(str: string): string {
  const spl: string[] = str.split(',');
  const newSpl = spl.filter((s) => s !== '');
  for (const s of newSpl) {
    if (!Object.values(DeclarationStatus).includes(s as DeclarationStatus)) {
      throw new Error(`${s} is not a good status`);
    }
  }
  return str;
}
