import type { Express } from 'express';
import express, { Router } from 'express';
import { jsonParserMiddleware } from '../core/middlewares';
import { appErrorHandlerMiddleware } from '../core/middlewares/appErrorHandler.middleware';
import { attachLoggerMiddleware } from '../core/middlewares/attachLogger.middleware';
import { defaultCacheMiddleware } from '../core/middlewares/cacheControl.middleware';

export interface IAppOptions {
  prefix: string;
  router: Router;
}

export default ({ prefix, router }: IAppOptions): Express =>
  express()
    .use(attachLoggerMiddleware())
    .use(jsonParserMiddleware)
    .use(defaultCacheMiddleware)
    .use(prefix, router)
    .use(appErrorHandlerMiddleware);
