import { Router } from 'express';
import { productRouter } from './product';
import { currencyRouter } from './currency';
import declaration from './declaration';
import authentication from './authentication';
import { feedbackRouter } from './feedback';
import { actualityRouter } from './actuality';
import { favoriteRouter } from './favorite';

export default Router()
  .use(productRouter)
  .use(currencyRouter)
  .use(feedbackRouter)
  .use(actualityRouter)
  .use(favoriteRouter)
  .use(actualityRouter)
  .use(declaration)
  .use(authentication);
