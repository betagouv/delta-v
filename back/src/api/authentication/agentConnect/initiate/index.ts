import { Router } from 'express';
import { validatedExpressRequest } from '../../../../core/utils/validatedExpressRequest';
import route from './route';

export const initiateAgentConnect = Router().get('/initiate', validatedExpressRequest(route));
