import { Router } from 'express';
import { productRouter } from './product';

export default Router().use(productRouter);
