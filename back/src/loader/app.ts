import express, { Router, Express } from 'express';
import { jsonParserMiddleware } from '../core/middlewares';

export interface IAppOptions {
  prefix: string;
  router: Router;
}

export default ({ prefix, router }: IAppOptions): Express =>
  express().use(jsonParserMiddleware).use(prefix, router);
