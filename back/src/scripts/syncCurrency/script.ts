import { AppDataSource } from '../../loader/database';
import { CurrencyRepository } from '../../repositories/currency.repository';
import { service } from './service';

export const syncCurrency = async (): Promise<void> => {
  await service(AppDataSource.manager.withRepository(CurrencyRepository));
};
