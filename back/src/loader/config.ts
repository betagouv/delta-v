// eslint-disable-next-line import/no-extraneous-dependencies
import { z } from 'zod';
import { envConfigParser, parseArray, parseBoolean } from '../utils/zodParser';

const Config = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z
    .string()
    .default('8080')
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: 'Expected number, received a string',
    }),
  ACCESS_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_LIFE: z.string().default('30m'),
  REFRESH_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_LIFE: z.string().default('1h'),
  VALIDATION_TOKEN_SECRET: z.string(),
  VALIDATION_TOKEN_LIFE: z.string().default('3d'),
  RESET_PASSWORD_TOKEN_SECRET: z.string(),
  RESET_PASSWORD_TOKEN_LIFE: z.string().default('3d'),
  URL_FRONTEND: z.string(),
  ROUTE_FRONTEND_VALIDATE_ACCOUNT: z.string(),
  ROUTE_FRONTEND_RESET_PASSWORD: z.string(),
  ROUTE_FRONTEND_CHECK_DECLARATION: z.string(),
  WHITE_LIST_AGENT_EMAIL: parseArray(z.string()),
  FEEDBACK_RECEIVER_EMAIL_LIST: parseArray(z.string()),
  DISABLE_RATE_LIMIT: parseBoolean(z.boolean()).default(false),
  REDIS_URL: z.string(),
  CELLAR_ADDON_KEY_ID: z.string(),
  CELLAR_ADDON_KEY_SECRET: z.string(),
  CELLAR_ADDON_HOST: z.string(),
  CELLAR_BUCKET_NAME: z.string(),
  AGENTCONNECT_CLIENT_ID: z.string(),
  AGENTCONNECT_CLIENT_SECRET: z.string(),
  AGENTCONNECT_REDIRECT_URI: z.string(),
  AGENTCONNECT_TOKEN_ENDPOINT: z.string(),
  AGENTCONNECT_USERINFO_ENDPOINT: z.string(),
});
export type Config = z.infer<typeof Config>;

export const buildConfig = (): Config => {
  return envConfigParser(Config);
};

export const config = buildConfig();
