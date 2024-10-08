import { v5 as uuidv5 } from 'uuid';
import { config } from '../loader/config';

export function generateDeterministicUuid(uid: string): string {
  return uuidv5(uid, config.UUID_NAMESPACE);
}
