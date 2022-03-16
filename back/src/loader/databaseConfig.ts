import { LoggerOptions } from 'typeorm/logger/LoggerOptions';

function checkRequiredVariables(requiredVariables: string[][], config: NodeJS.ProcessEnv): void {
  requiredVariables.forEach((keys): void => {
    const isVariableDefined = !!keys.map((key) => config[key]).find((value) => value !== undefined);

    if (!isVariableDefined) {
      throw new Error(`${keys[0]} env variable is required`);
    }
  });
}

export interface IConfigBuilderOptions<T> {
  requiredVariables?: string[][];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseFunction: (config: any) => T;
}

export const configBuilder =
  <T>({ requiredVariables, parseFunction }: IConfigBuilderOptions<T>) =>
  (): T => {
    if (requiredVariables) {
      checkRequiredVariables(requiredVariables, process.env);
    }

    return parseFunction(process.env);
  };

export interface IDatabaseConfig {
  DB_LOGGING: LoggerOptions;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  INSTANCE_CONNECTION_NAME?: string;
}

function parseBoolean(val: string): boolean | undefined {
  const booleanStringMap: Record<string, boolean> = {
    true: true,
    false: false,
  };
  return booleanStringMap[val] ?? undefined;
}

function parseNumber(val: string): number {
  return parseInt(val, 10);
}

const requiredVariables: string[][] = [
  ['DB_USERNAME', 'POSTGRESQL_ADDON_USER'],
  ['DB_PASSWORD', 'POSTGRESQL_ADDON_PASSWORD'],
  ['DB_DATABASE', 'POSTGRESQL_ADDON_DB'],
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseConfig(config: any): IDatabaseConfig {
  return {
    DB_HOST: config.POSTGRESQL_ADDON_HOST ?? config.DB_HOST,
    DB_DATABASE: config.POSTGRESQL_ADDON_DB ?? config.DB_DATABASE,
    DB_PASSWORD: config.POSTGRESQL_ADDON_PASSWORD ?? config.DB_PASSWORD,
    DB_USERNAME: config.POSTGRESQL_ADDON_USER ?? config.DB_USERNAME,
    DB_PORT: config.POSTGRESQL_ADDON_PORT
      ? parseNumber(config.POSTGRESQL_ADDON_PORT)
      : parseNumber(config.DB_PORT),
    DB_LOGGING: parseBoolean(config.DB_LOGGING) ?? (config.DB_LOGGING as LoggerOptions),
  };
}

export const buildConfig = configBuilder<IDatabaseConfig>({
  requiredVariables,
  parseFunction: parseConfig,
});
