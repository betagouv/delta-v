import express, { Router, Express } from 'express';
import session from 'express-session';
import { jsonParserMiddleware } from '../core/middlewares';
import { appErrorHandlerMiddleware } from '../core/middlewares/appErrorHandler.middleware';
import { attachLoggerMiddleware } from '../core/middlewares/attachLogger.middleware';
import { defaultCacheMiddleware } from '../core/middlewares/cacheControl.middleware';
import { config } from './config';

export interface IAppOptions {
  prefix: string;
  router: Router;
}

export default ({ prefix, router }: IAppOptions): Express =>
  express()
    .use(
      session({
        secret: config.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: config.NODE_ENV === 'production' },
      }),
    )
    .use(attachLoggerMiddleware())
    .use(jsonParserMiddleware)
    .use(defaultCacheMiddleware)
    .use(prefix, router)
    .use(appErrorHandlerMiddleware);
