import { Repository } from 'typeorm';
import { Currency, CurrencyEntity } from '../entities/currency.entity';
import { AppDataSource } from '../loader/database';

export type CurrencyRepositoryInterface = {
  saveAll(currencies: Currency[]): Promise<void>;
  getAll(): Promise<Currency[]>;
  getManyByIds(currencyIds: string[]): Promise<Currency[]>;
} & Repository<Currency>;

export const CurrencyRepository: CurrencyRepositoryInterface = AppDataSource.getRepository(
  CurrencyEntity,
).extend({
  async saveAll(currencies: Currency[]): Promise<void> {
    await this.save(currencies);
  },
  async getAll(): Promise<Currency[]> {
    return this.createQueryBuilder('currency').getMany();
  },
  async getManyByIds(currencyIds: string[]): Promise<Currency[]> {
    if (!currencyIds.length) {
      return [];
    }
    return this.createQueryBuilder('currency')
      .where('currency.id in (:...currencyIds)', { currencyIds })
      .getMany();
  },
});
