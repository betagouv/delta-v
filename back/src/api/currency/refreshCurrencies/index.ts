import { Router } from 'express';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';
import route from './route';

export const refreshCurrencies = Router().post('/currency/refresh', validatedExpressRequest(route));
