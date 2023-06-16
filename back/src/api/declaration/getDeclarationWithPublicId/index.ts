import { Router } from 'express';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';
import route from './route';
import validator from './validator';

export const getDeclarationWithPublicId = Router().get(
  '/declaration/public/:publicDeclarationId',
  validator,
  validatedExpressRequest(route),
);
