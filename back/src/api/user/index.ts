import { Router } from 'express';
import { getAverage } from './getAverage';

export const userRoute = Router().use(getAverage);
