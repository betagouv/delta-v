import { resolve } from 'path';
import { emailRenderer } from '../../../emailRenderer';

export interface IEmailParams {
  siteUrl: string;
  email: string;
  emailAskResetPasswordUrl: string;
}

const templatePath = resolve(__dirname, './templates/askResetPassword.template.hbs');

export const buildAskResetPasswordEmailRenderer = (params: IEmailParams): Promise<string> =>
  emailRenderer(templatePath, params);
