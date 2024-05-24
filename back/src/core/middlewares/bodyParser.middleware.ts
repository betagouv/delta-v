import { json, urlencoded, OptionsJson, OptionsUrlencoded } from 'body-parser';
import type { RequestHandler } from 'express';

export const buildJSONParserMiddleware = (options?: OptionsJson): RequestHandler => json(options);
export const buildURLEncodedParserMiddleware = (options?: OptionsUrlencoded): RequestHandler =>
  urlencoded({ extended: true, ...options });

export const jsonParserMiddleware = buildJSONParserMiddleware();
export const urlEncodedParserMiddleware = buildURLEncodedParserMiddleware();
