import { faker } from '@faker-js/faker';
import type { Alpha2Code } from 'i18n-iso-countries';
import { buildFactory } from '../../../src/core/testHelpers';
import { Config } from '../../../src/entities/config.entity';
import { Alpha2CodeEnum } from '../../../src/utils/country.util';

const buildSchema = (): Config => {
  return {
    userId: faker.string.uuid(),
    defaultCountry: faker.helpers.enumValue(Alpha2CodeEnum) as Alpha2Code,
  };
};

export const configEntityFactory = (args?: Partial<Config>): Config =>
  buildFactory<Config>({
    ...buildSchema(),
  })(args);
