import { Router } from 'express';
import { getAllCurrencies } from './getAll';
import { refreshCurrencies } from './refreshCurrencies';

export const currencyRouter = Router().use(getAllCurrencies).use(refreshCurrencies);
