import { Router } from 'express';
import { putDefaultCountry } from './putDefaultCountry';
import { getDefaultCountry } from './getDefaultCountry';

export const configRouter = Router().use(putDefaultCountry).use(getDefaultCountry);
