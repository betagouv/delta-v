import { Router } from 'express';
import { productRouter } from './product';
import { currencyRouter } from './currency';
import declaration from './declaration';
import authentication from './authentication';
import { feedbackRouter } from './feedback';

export default Router()
  .use(productRouter)
  .use(currencyRouter)
  .use(feedbackRouter)
  .use(declaration)
  .use(authentication);
