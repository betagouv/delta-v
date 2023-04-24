import { CurrencyEntity } from '../../src/entities/currency.entity';
import { AppDataSource } from '../../src/loader/database';
import {
  CurrencyRepository,
  CurrencyRepositoryInterface,
} from '../../src/repositories/currency.repository';

interface CurrencyRepositoryMockOptions {
  getAll?: CurrencyEntity[];
  getManyByIds?: CurrencyEntity[];
}

export const currencyRepositoryMock = (
  options: CurrencyRepositoryMockOptions,
): CurrencyRepositoryInterface => {
  const currencyRepository = AppDataSource.manager.withRepository(CurrencyRepository);
  currencyRepository.saveAll = jest.fn().mockResolvedValue(undefined);
  currencyRepository.getAll = jest.fn().mockResolvedValue(options.getAll ?? []);
  currencyRepository.getManyByIds = jest.fn().mockResolvedValue(options.getManyByIds ?? []);
  return currencyRepository;
};
