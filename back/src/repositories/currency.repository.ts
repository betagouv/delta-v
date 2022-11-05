import { EntityRepository, Repository } from 'typeorm';
import { Currency, CurrencyEntity } from '../entities/currency.entity';

export interface CurrencyRepositoryInterface extends Repository<CurrencyEntity> {
  saveAll(currencies: Currency[]): Promise<void>;
  getAll(): Promise<Currency[]>;
  getManyByIds(currencyIds: string[]): Promise<Currency[]>;
}

@EntityRepository(CurrencyEntity)
export default class CurrencyRepository
  extends Repository<CurrencyEntity>
  implements CurrencyRepositoryInterface
{
  async saveAll(currencies: Currency[]): Promise<void> {
    await this.save(currencies);
  }
  async getAll(): Promise<Currency[]> {
    return this.createQueryBuilder('currency').getMany();
  }
  async getManyByIds(currencyIds: string[]): Promise<Currency[]> {
    return this.createQueryBuilder('currency')
      .where('currency.id in (:...currencyIds)', { currencyIds })
      .getMany();
  }
}
