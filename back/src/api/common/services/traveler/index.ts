import type { Alpha2Code } from 'i18n-iso-countries';
import { MeansOfTransport } from '../../enums/meansOfTransport.enum';

export interface TravelerData {
  border: boolean;
  age: number;
  country: Alpha2Code;
  meanOfTransport?: MeansOfTransport;
}
