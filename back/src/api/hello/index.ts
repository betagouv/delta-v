import { Router } from 'express';
import { validatedExpressRequest } from '../../core/utils/validatedExpressRequest';
import route from './route';

export default Router().get('/hello', validatedExpressRequest(route));
