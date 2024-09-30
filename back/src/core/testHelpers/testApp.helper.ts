import { Router, Express } from 'express';
import session from 'express-session';
// eslint-disable-next-line no-restricted-imports
import { testSessionMiddleware } from '../../../tests/helpers/testSessionMiddleware';

export interface IBuildAppFunctionArgs {
  prefix: string;
  router: Router;
}

export type BuildAppFunction = (args: IBuildAppFunctionArgs) => Express;

/**
 * Factory of Express application for test purposes.
 * @param buildAppFunction function that builds Express app
 */
export const buildTestAppHelper =
  (buildAppFunction: BuildAppFunction, servicePrefix: string) =>
  (router: Router, otherPrefix?: string): Express => {
    const app = buildAppFunction({
      prefix: `${servicePrefix}${otherPrefix || ''}`,
      router: router,
    });

    // Ajout du middleware de session
    app.use(
      session({
        secret: 'test-secret',
        resave: false,
        saveUninitialized: true,
      }),
    );

    // Ajout du middleware de test pour la session
    app.use(testSessionMiddleware);

    return app;
  };

/**
 * Factory of Express application for test purposes.
 * @param buildAppFunction function that builds Express app
 */
export const buildManyRoutersTestAppHelper =
  (buildAppFunction: BuildAppFunction, servicePrefix: string) =>
  (routers: Router[], otherPrefix?: string): Express => {
    return buildAppFunction({
      prefix: `${servicePrefix}${otherPrefix || ''}`,
      router: routers.reduce((acc: Router, cur: Router) => acc.use(cur), Router()),
    });
  };
