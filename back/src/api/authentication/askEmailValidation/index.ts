import { Router } from 'express';

import { jwtMiddleware } from '../../../core/middlewares/jwt.middleware';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';
import route from './route';

export const askEmailValidation = Router().post(
  '/email/validate/ask',
  jwtMiddleware(),
  validatedExpressRequest(route),
);
