import { Router } from 'express';
import { Redis } from 'ioredis';
import { productRouter } from './product';
import { currencyRouter } from './currency';
import declaration from './declaration';
import authentication from './authentication';
import { feedbackRouter } from './feedback';
import { actualityRouter } from './actuality';
import { favoriteRouter } from './favorite';
import { paymentRouter } from './payment';

export interface IApiOptions {
  redisConnection: Redis;
}

export default Router()
  .use(productRouter)
  .use(currencyRouter)
  .use(feedbackRouter)
  .use(actualityRouter)
  .use(favoriteRouter)
  .use(paymentRouter)
  .use(declaration)
  .use(authentication);
