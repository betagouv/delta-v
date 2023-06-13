import { Router } from 'express';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';
import route from './route';
import validator from './validator';

export const getDeclarations = Router().get(
  '/declaration',
  validator,
  validatedExpressRequest(route),
);
