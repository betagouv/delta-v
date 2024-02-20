export interface IAppConfig {
  NODE_ENV: string;
  PORT: number;
  ACCESS_TOKEN_SECRET: string;
  ACCESS_TOKEN_LIFE: string;
  REFRESH_TOKEN_SECRET: string;
  REFRESH_TOKEN_LIFE: string;
  VALIDATION_TOKEN_SECRET: string;
  VALIDATION_TOKEN_LIFE: string;
  RESET_PASSWORD_TOKEN_SECRET: string;
  RESET_PASSWORD_TOKEN_LIFE: string;
  URL_FRONTEND: string;
  ROUTE_FRONTEND_VALIDATE_ACCOUNT: string;
  ROUTE_FRONTEND_RESET_PASSWORD: string;
  ROUTE_FRONTEND_CHECK_DECLARATION: string;
  WHITE_LIST_AGENT_EMAIL: string[];
  FEEDBACK_RECEIVER_EMAIL_LIST: string[];
  DISABLE_RATE_LIMIT: boolean;
  REDIS_URL: string;
  CELLAR_KEY_ID: string;
  CELLAR_KEY_SECRET: string;
  CELLAR_HOST: string;
  CELLAR_BUCKET_NAME: string;
}

const REQUIRED_VARIABLES: string[] = [
  'ACCESS_TOKEN_SECRET',
  'REFRESH_TOKEN_SECRET',
  'VALIDATION_TOKEN_SECRET',
  'RESET_PASSWORD_TOKEN_SECRET',
  'URL_FRONTEND',
  'ROUTE_FRONTEND_VALIDATE_ACCOUNT',
  'ROUTE_FRONTEND_RESET_PASSWORD',
  'ROUTE_FRONTEND_CHECK_DECLARATION',
  'REDIS_URL',
];

export function checkRequiredVariables(config: NodeJS.ProcessEnv): void {
  REQUIRED_VARIABLES.forEach((key): void => {
    if (!config[key] || config[key] === '') {
      throw new Error(`${key} env variable is required`);
    }
  });
}

const getBoolean = (value: string | undefined): boolean => {
  if (value === undefined) {
    return false;
  }
  return value.toLowerCase() === 'true';
};

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
    VALIDATION_TOKEN_LIFE: config.VALIDATION_TOKEN_LIFE ?? '3d',
    RESET_PASSWORD_TOKEN_SECRET: config.RESET_PASSWORD_TOKEN_SECRET,
    RESET_PASSWORD_TOKEN_LIFE: config.RESET_PASSWORD_TOKEN_LIFE ?? '3d',
    URL_FRONTEND: config.URL_FRONTEND,
    ROUTE_FRONTEND_VALIDATE_ACCOUNT: config.ROUTE_FRONTEND_VALIDATE_ACCOUNT,
    ROUTE_FRONTEND_RESET_PASSWORD: config.ROUTE_FRONTEND_RESET_PASSWORD,
    ROUTE_FRONTEND_CHECK_DECLARATION: config.ROUTE_FRONTEND_CHECK_DECLARATION,
    WHITE_LIST_AGENT_EMAIL: config.WHITE_LIST_AGENT_EMAIL
      ? config.WHITE_LIST_AGENT_EMAIL.split(',')
      : [],
    FEEDBACK_RECEIVER_EMAIL_LIST: config.FEEDBACK_RECEIVER_EMAIL_LIST
      ? config.FEEDBACK_RECEIVER_EMAIL_LIST.split(',')
      : [],
    DISABLE_RATE_LIMIT: getBoolean(config.DISABLE_RATE_LIMIT) ?? false,
    REDIS_URL: config.REDIS_URL,
    CELLAR_KEY_ID: config.CELLAR_KEY_ID,
    CELLAR_KEY_SECRET: config.CELLAR_KEY_SECRET,
    CELLAR_HOST: config.CELLAR_HOST,
    CELLAR_BUCKET_NAME: config.CELLAR_BUCKET_NAME,
  };
}

export const buildConfig = (config = process.env): IAppConfig => {
  checkRequiredVariables(config);
  return parseConfig(config);
};

export const config = buildConfig();
