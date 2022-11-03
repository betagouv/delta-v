import { Router } from 'express';
import { productRouter } from './product';
import { currencyRouter } from './currency';
import { simulate } from './simulator';

export default Router().use(productRouter).use(currencyRouter).use(simulate);
