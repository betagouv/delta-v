import { Router } from 'express';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';
import route from './route';

export const getAllProducts = Router().get('/product', validatedExpressRequest(route));
