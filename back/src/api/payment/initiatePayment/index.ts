import { Router } from 'express';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';
import route from './route';
import validator from './validator';

export const payment = Router().post('/payment', validator, validatedExpressRequest(route));
