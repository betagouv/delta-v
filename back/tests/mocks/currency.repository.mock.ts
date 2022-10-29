import CurrencyRepository, {
  CurrencyRepositoryInterface,
} from '../../src/repositories/currency.repository';

export const currencyRepositoryMock = (): CurrencyRepositoryInterface => {
  const currencyRepository = new CurrencyRepository();
  currencyRepository.saveAll = jest.fn().mockResolvedValue(undefined);
  return currencyRepository;
};
