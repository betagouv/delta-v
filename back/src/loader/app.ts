import express, { Router, Express } from 'express';
import { jsonParserMiddleware } from '../core/middlewares';
import { appErrorHandlerMiddleware } from '../core/middlewares/appErrorHandler.middleware';
import { attachLoggerMiddleware } from '../core/middlewares/attachLogger.middleware';

export interface IAppOptions {
  prefix: string;
  router: Router;
}

export default ({ prefix, router }: IAppOptions): Express =>
  express()
    .use(attachLoggerMiddleware())
    .use(jsonParserMiddleware)
    .use(prefix, router)
    .use(appErrorHandlerMiddleware);
