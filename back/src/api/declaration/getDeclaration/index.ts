import { Router } from 'express';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';
import route from './route';
import validator from './validator';

export const getDeclaration = Router().get(
  '/declaration/:declarationId',
  validator,
  validatedExpressRequest(route),
);
