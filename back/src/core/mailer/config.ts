export interface ISesMailerConfig {
  FROM_EMAIL: string;
  FROM_SENDER_NAME: string;
  SMTP_URL: string;
}

const REQUIRED_VARIABLES: string[] = ['FROM_EMAIL', 'SMTP_URL'];

export function checkRequiredVariables(config: NodeJS.ProcessEnv): void {
  REQUIRED_VARIABLES.forEach((key): void => {
    if (!config[key] || config[key] === '') {
      throw new Error(`${key} env variable is required`);
    }
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseConfig(config: any): ISesMailerConfig {
  return {
    FROM_EMAIL: config.FROM_EMAIL,
    FROM_SENDER_NAME: config.FROM_SENDER_NAME,
    SMTP_URL: config.SMTP_URL,
  };
}

export const buildConfig = (config = process.env): ISesMailerConfig => {
  checkRequiredVariables(config);
  return parseConfig(config);
};
