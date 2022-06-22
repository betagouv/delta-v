import { Router } from 'express';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';
import route from './route';
import validator from './validator';

export const getAverage = Router().get(
  '/user/:id/average',
  validator,
  validatedExpressRequest(route),
);
