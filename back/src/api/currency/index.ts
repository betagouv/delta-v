import { Router } from 'express';
import { getAllCurrencies } from './getAll';

export const currencyRouter = Router().use(getAllCurrencies);
