import Joi, { Root, StringSchema } from 'joi';
import sanitizeHtml from 'sanitize-html';

interface ExtendedStringSchema extends StringSchema {
  htmlStrip(): this;
}

interface ExtendedJoi extends Root {
  string(): ExtendedStringSchema;
}

export const validator: ExtendedJoi = Joi.extend((joi) => ({
  base: joi.string(),
  type: 'string',
  rules: {
    htmlStrip: {
      validate(value: string): string {
        return sanitizeHtml(value, { allowedTags: [] });
      },
    },
  },
}));

export default Joi;
