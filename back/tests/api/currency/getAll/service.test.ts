import { service } from '../../../../src/api/currency/getAll/service';
import { currencyEntityFactory } from '../../../helpers/factories/currency.factory';
import { currencyRepositoryMock } from '../../../mocks/currency.repository.mock';

describe('test get all currencies service', () => {
  it('should get all the currencies', async () => {
    const currency = currencyEntityFactory();
    const currencyRepository = currencyRepositoryMock({ getAll: [currency] });
    const result = await service({ currencyRepository });
    expect(result).toEqual([currency]);
  });
});
