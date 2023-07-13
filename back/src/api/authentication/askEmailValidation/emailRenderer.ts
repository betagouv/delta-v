import { resolve } from 'path';
import { emailRenderer } from '../../../emailRenderer';

export interface IEmailParams {
  siteUrl: string;
  emailVerificationUrl: string;
}

const templatePath = resolve(__dirname, './templates/askEmailValidation.template.hbs');

export const buildAskEmailValidationEmailRenderer = (params: IEmailParams): Promise<string> =>
  emailRenderer(templatePath, params);
