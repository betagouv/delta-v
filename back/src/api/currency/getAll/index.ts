import { Router } from 'express';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';
import route from './route';

export const getAllCurrencies = Router().get('/currency', validatedExpressRequest(route));
