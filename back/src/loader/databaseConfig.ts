import { LoggerOptions } from 'typeorm/logger/LoggerOptions';

function checkRequiredVariables(requiredVariables: string[], config: NodeJS.ProcessEnv): void {
  requiredVariables.forEach((key): void => {
    if (!config[key] || config[key] === '') {
      throw new Error(`${key} env variable is required`);
    }
  });
}

export interface IConfigBuilderOptions<T> {
  requiredVariables?: string[];
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

const requiredVariables: (keyof IDatabaseConfig)[] = ['DB_USERNAME', 'DB_PASSWORD', 'DB_DATABASE'];

export const buildConfig = configBuilder<IDatabaseConfig>({
  requiredVariables,
  parseFunction: (config: { [key in keyof IDatabaseConfig]: string }) => ({
    ...config,
    DB_LOGGING: parseBoolean(config.DB_LOGGING) ?? (config.DB_LOGGING as LoggerOptions),
    DB_PORT: parseNumber(config.DB_PORT),
  }),
});
