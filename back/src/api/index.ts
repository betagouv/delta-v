import { Router } from 'express';
import { productRouter } from './product';
import { currencyRouter } from './currency';
import declaration from './declaration';
import authentication from './authentication';

export default Router().use(productRouter).use(currencyRouter).use(declaration).use(authentication);
