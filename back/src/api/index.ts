import { Router } from 'express';
import { productRouter } from './product';
import { simulate } from './simulator';

export default Router().use(productRouter).use(simulate);
