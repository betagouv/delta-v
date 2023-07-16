import { resolve } from 'path';
import { emailRenderer } from '../../../emailRenderer';

export interface IEmailParams {
  siteUrl: string;
  agentEmail: string;
  agentId: string;
  comment: string;
}

const templatePath = resolve(__dirname, './templates/putFeedback.template.hbs');

export const buildPutFeedbackEmailRenderer = (params: IEmailParams): Promise<string> =>
  emailRenderer(templatePath, params);
