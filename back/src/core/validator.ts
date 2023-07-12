import Joi from 'joi';
import sanitizeHtml from 'sanitize-html';

export const validator: Joi.Root = Joi.extend((joi) => ({
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
