import { getCustomRepository } from 'typeorm';
import CurrencyRepository, {
  CurrencyRepositoryInterface,
} from '../../src/repositories/currency.repository';
import { currencyEntityFactory } from '../helpers/factories/currency.factory';
import { testDbManager } from '../helpers/testDb.helper';

const testDb = testDbManager();

describe('test currency repository', () => {
  let repository: CurrencyRepositoryInterface;

  beforeAll(async () => {
    await testDb.connect();
    repository = getCustomRepository(CurrencyRepository);
  });

  beforeEach(async () => {
    await testDb.clear();
  });

  afterAll(async () => {
    await testDb.disconnect();
  });
  describe('test saveAll', () => {
    it('should return all products', async () => {
      await testDb.persistCurrency(currencyEntityFactory({ id: 'GBP', value: 0.89485 }));
      await testDb.persistCurrency(currencyEntityFactory({ id: 'EUR' }));
      await testDb.persistCurrency(currencyEntityFactory({ id: 'USD' }));
      await testDb.persistCurrency(currencyEntityFactory({ id: 'RUB' }));

      const gbpCurrency = currencyEntityFactory({ id: 'GBP', value: 12 });
      const lbpCurrency = currencyEntityFactory({ id: 'LBP', value: 5 });
      await repository.saveAll([gbpCurrency, lbpCurrency]);

      const currencies = await testDb.getCurrencies();
      expect(currencies).toHaveLength(5);
      expect(currencies.find((currency) => currency.id === 'GBP')?.value).toEqual(12);
      expect(currencies.find((currency) => currency.id === 'LBP')).toBeDefined();
      expect(currencies.find((currency) => currency.id === 'EUR')).toBeDefined();
      expect(currencies.find((currency) => currency.id === 'USD')).toBeDefined();
      expect(currencies.find((currency) => currency.id === 'RUB')).toBeDefined();
    });
  });
});
