import { resolve } from 'path';
import { emailRenderer } from '../../../emailRenderer';

export interface IEmailParams {
  siteUrl: string;
  emailSAV: string;
  phoneNumberSAV: string;
}

const templatePath = resolve(__dirname, './templates/updatePassword.template.hbs');

export const buildUpdatePasswordEmailRenderer = (params: IEmailParams): Promise<string> =>
  emailRenderer(templatePath, params);
