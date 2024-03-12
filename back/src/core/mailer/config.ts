// eslint-disable-next-line import/no-extraneous-dependencies
import { z } from 'zod';
import { envConfigParser } from '../../utils/zodParser';

const SesMailerConfig = z.object({
  FROM_EMAIL: z.string(),
  FROM_SENDER_NAME: z.string(),
  SMTP_URL: z.string(),
});

export type SesMailerConfig = z.infer<typeof SesMailerConfig>;

export const buildConfig = (): SesMailerConfig => {
  return envConfigParser(SesMailerConfig);
};
