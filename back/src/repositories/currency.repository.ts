import { EntityRepository, Repository } from 'typeorm';
import { Currency, CurrencyEntity } from '../entities/currency.entity';

export interface CurrencyRepositoryInterface extends Repository<CurrencyEntity> {
  saveAll(currencies: Currency[]): Promise<void>;
}

@EntityRepository(CurrencyEntity)
export default class CurrencyRepository
  extends Repository<CurrencyEntity>
  implements CurrencyRepositoryInterface
{
  async saveAll(currencies: Currency[]): Promise<void> {
    await this.save(currencies);
  }
}
