import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { buildConfig } from './config';

export interface IMailerSendOptions {
  to: string;
  html: string;
  subject: string;
  attachments?: Mail.Attachment[];
}

export type MailerFunction = (options: IMailerSendOptions) => Promise<void>;

export const connectAndSendEmail: MailerFunction = async (
  options: IMailerSendOptions,
): Promise<void> => {
  const config = buildConfig();

  const transporter = createTransport({
    url: config.SMTP_URL,
  });

  await transporter.sendMail({
    from: config.FROM_EMAIL,
    to: options.to,
    subject: options.subject,
    html: options.html,
    attachments: options.attachments,
  });
};
