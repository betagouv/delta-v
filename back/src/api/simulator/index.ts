import { Router } from 'express';
import { validatedExpressRequest } from '../../core/utils/validatedExpressRequest';
import route from './route';
import validator from './validator';

export const simulate = Router().post('/simulator', validator, validatedExpressRequest(route));
