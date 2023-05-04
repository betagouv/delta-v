export interface IAppConfig {
  NODE_ENV: string;
  PORT: number;
  ACCESS_TOKEN_SECRET: string;
  ACCESS_TOKEN_LIFE: string;
  REFRESH_TOKEN_SECRET: string;
  REFRESH_TOKEN_LIFE: string;
  VALIDATION_TOKEN_SECRET: string;
  VALIDATION_TOKEN_LIFE: string;
}

const REQUIRED_VARIABLES: string[] = ['ACCESS_TOKEN_SECRET', 'REFRESH_TOKEN_SECRET'];

export function checkRequiredVariables(config: NodeJS.ProcessEnv): void {
  REQUIRED_VARIABLES.forEach((key): void => {
    if (!config[key] || config[key] === '') {
      throw new Error(`${key} env variable is required`);
    }
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseConfig(config: any): IAppConfig {
  return {
    NODE_ENV: config.NODE_ENV ?? 'development',
    PORT: config.PORT ?? 8080,
    ACCESS_TOKEN_SECRET: config.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_LIFE: config.ACCESS_TOKEN_LIFE ?? '30m',
    REFRESH_TOKEN_SECRET: config.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_LIFE: config.REFRESH_TOKEN_LIFE ?? '1h',
    VALIDATION_TOKEN_SECRET: config.VALIDATION_TOKEN_SECRET,
    VALIDATION_TOKEN_LIFE: config.VALIDATION_TOKEN_LIFE ?? '3j',
  };
}

function buildConfig(config = process.env): IAppConfig {
  checkRequiredVariables(config);
  return parseConfig(config);
}

export default buildConfig();
