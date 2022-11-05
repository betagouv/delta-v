import { CurrencyEntity } from '../../src/entities/currency.entity';
import CurrencyRepository, {
  CurrencyRepositoryInterface,
} from '../../src/repositories/currency.repository';

interface CurrencyRepositoryMockOptions {
  getAll?: CurrencyEntity[];
  getManyByIds?: CurrencyEntity[];
}

export const currencyRepositoryMock = (
  options: CurrencyRepositoryMockOptions,
): CurrencyRepositoryInterface => {
  const currencyRepository = new CurrencyRepository();
  currencyRepository.saveAll = jest.fn().mockResolvedValue(undefined);
  currencyRepository.getAll = jest.fn().mockResolvedValue(options.getAll ?? []);
  currencyRepository.getManyByIds = jest.fn().mockResolvedValue(options.getManyByIds ?? []);
  return currencyRepository;
};
