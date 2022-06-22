import { Router } from 'express';
import { productRouter } from './product';
import { simulate } from './simulator';
import { userRoute } from './user';

export default Router().use(productRouter).use(simulate).use(userRoute);
