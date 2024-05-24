import type { Express } from 'express';
import { Router } from 'express';

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
    return buildAppFunction({
      prefix: `${servicePrefix}${otherPrefix || ''}`,
      router: router,
    });
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
