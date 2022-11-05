import { Request, Response, NextFunction } from 'express';
import config from '../../loader/config';

export enum CacheDuration {
  ZERO = 0,
  ONE_MINUTE = 60,
  TEN_MINUTES = 600,
  ONE_HOUR = 3600,
  TREE_HOURS = 10800,
  TEN_HOURS = 36000,
  ONE_DAY = 86400,
  ONE_WEEK = 604800,
  ONE_MONTH = 2592000,
  ONE_YEAR = 31536000,
}

export interface ICacheMiddlewareOptions {
  cacheDuration: CacheDuration;
  cacheProxyDuration?: CacheDuration;
}

interface ISetCacheOptions extends ICacheMiddlewareOptions {
  res: Response;
  method?: string;
}

export const setCache = ({
  cacheDuration,
  cacheProxyDuration,
  res,
  method = 'GET',
}: ISetCacheOptions): void => {
  const cacheProxy = cacheProxyDuration ?? cacheDuration;
  if (method == 'GET' && config.NODE_ENV === 'production') {
    res.set('Cache-control', `public, max-age=${cacheDuration}, s-maxage=${cacheProxy}`);
  } else {
    res.set('Cache-control', `no-store, no-cache, max-age=0`);
  }
};

export const customCacheMiddleware =
  ({ cacheDuration, cacheProxyDuration }: ICacheMiddlewareOptions) =>
  (req: Request, res: Response, next: NextFunction): void | Response => {
    const definedCacheDuration = req.query.lowCache ? CacheDuration.ONE_MINUTE : undefined;
    const finalCacheDuration = definedCacheDuration ?? cacheDuration;
    const finalCacheProxyDuration =
      cacheProxyDuration === CacheDuration.ZERO ? cacheProxyDuration : definedCacheDuration;

    setCache({
      cacheDuration: finalCacheDuration,
      cacheProxyDuration: finalCacheProxyDuration,
      method: req.method,
      res,
    });
    return next();
  };

export const defaultCacheMiddleware = customCacheMiddleware({
  cacheDuration: CacheDuration.ONE_MINUTE,
});
