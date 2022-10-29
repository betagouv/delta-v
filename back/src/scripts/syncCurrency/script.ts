import { getCustomRepository } from 'typeorm';
import CurrencyRepository from '../../repositories/currency.repository';
import { service } from './service';

export const syncCurrency = async (): Promise<void> => {
  await service(getCustomRepository(CurrencyRepository));
};
