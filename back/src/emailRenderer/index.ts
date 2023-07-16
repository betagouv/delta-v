import { promises } from 'fs';
import { resolve } from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import handlebars from 'handlebars';

const ENCODING = 'utf8';
const PARTIAL_NAME = 'layout';
const BASE_TEMPLATE_PATH = resolve(__dirname, '../static/templates/base.template.hbs');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TemplateParams = { [key: string]: any };

/**
 * Renders html code of email. Template is attached into base html code.
 * @param templatePath path of .hbs file
 * @param params params passed into template
 */
export async function emailRenderer(
  templatePath: string,
  params?: TemplateParams,
): Promise<string> {
  const baseSource = await promises.readFile(BASE_TEMPLATE_PATH, ENCODING);
  const templateSource = await promises.readFile(templatePath, ENCODING);

  handlebars.registerPartial(PARTIAL_NAME, templateSource);

  const template = handlebars.compile(baseSource);
  const htmlTemplate = template(params);

  handlebars.unregisterPartial(PARTIAL_NAME);

  return htmlTemplate;
}
