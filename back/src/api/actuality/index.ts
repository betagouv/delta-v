import { Router } from 'express';
import { getActualities } from './getActualities';

export const actualityRouter = Router().use(getActualities);
