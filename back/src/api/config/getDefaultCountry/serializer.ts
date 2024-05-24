import type { Alpha2Code } from 'i18n-iso-countries';
import { Config } from '../../../entities/config.entity';

export interface SerializedGetDefaultCountry {
  defaultCountry: Alpha2Code | null;
}

export default (config: Config): SerializedGetDefaultCountry => ({
  defaultCountry: config.defaultCountry,
});
