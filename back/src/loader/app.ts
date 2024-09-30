import express, { Router, Express } from 'express';
import session from 'express-session';
import { jsonParserMiddleware } from '../core/middlewares';
import { appErrorHandlerMiddleware } from '../core/middlewares/appErrorHandler.middleware';
import { attachLoggerMiddleware } from '../core/middlewares/attachLogger.middleware';
import { defaultCacheMiddleware } from '../core/middlewares/cacheControl.middleware';
import { CustomSession } from '../core/utils/validatedExpressRequest';
import { config } from './config';

export interface IAppOptions {
  prefix: string;
  router: Router;
}

export default ({ prefix, router }: IAppOptions): Express => {
  const app = express();
  app
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

  app.get('/api/set-session-for-test', (req, res) => {
    const sessionData = req.body as Partial<CustomSession>;
    Object.assign(req.session, sessionData);
    res.sendStatus(200);
  });

  return app;
};
