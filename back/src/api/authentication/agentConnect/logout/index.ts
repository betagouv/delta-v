import { Router } from 'express';
import { validatedExpressRequest } from '../../../../core/utils/validatedExpressRequest';
import route from './route';

export const logoutAgentConnect = Router().get('/logout', validatedExpressRequest(route));
