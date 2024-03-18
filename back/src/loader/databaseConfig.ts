// eslint-disable-next-line import/no-extraneous-dependencies
import { z } from 'zod';
import { envConfigParser, parseBoolean, Validation } from '../utils/zodParser';

const DatabaseConfig = z.object({
  DB_LOGGING: parseBoolean(z.boolean()).default(false),
  POSTGRESQL_ADDON_URI: z.string().url(),
  INSTANCE_CONNECTION_NAME: z.string().optional(),
});
export type DatabaseConfig = z.infer<typeof DatabaseConfig>;

export interface IConfigBuilderOptions<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseFunction: (config: any) => T;
}

export const configBuilder =
  <T extends Validation>({ parseFunction }: IConfigBuilderOptions<T>) =>
  (): T => {
    return parseFunction(DatabaseConfig);
  };

export const buildConfig = configBuilder({
  parseFunction: envConfigParser,
});
