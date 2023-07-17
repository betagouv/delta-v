import { resolve } from 'path';
import { emailRenderer } from '../../../emailRenderer';

export interface IEmailParams {
  siteUrl: string;
  declarationDetailsUrl: string;
}

const templatePath = resolve(__dirname, './templates/checkDeclaration.template.hbs');

export const buildCheckDeclarationEmailRenderer = (params: IEmailParams): Promise<string> =>
  emailRenderer(templatePath, params);
