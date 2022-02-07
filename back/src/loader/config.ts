export interface IAppConfig {
  NODE_ENV: string;
  PORT: number;
}

const REQUIRED_VARIABLES: string[] = [];

function checkRequiredVariables(config: NodeJS.ProcessEnv): void {
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
  };
}

function buildConfig(config = process.env): IAppConfig {
  checkRequiredVariables(config);
  return parseConfig(config);
}

export default buildConfig();
