import { Router } from 'express';
import { productRouter } from './product';
import { currencyRouter } from './currency';
import declaration from './declaration';

export default Router().use(productRouter).use(currencyRouter).use(declaration);
