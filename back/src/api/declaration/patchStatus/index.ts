import { Router } from 'express';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';
import route from './route';
import validator from './validator';

export const patchStatus = Router().patch(
  '/declaration/:declarationId',
  validator,
  validatedExpressRequest(route),
);
