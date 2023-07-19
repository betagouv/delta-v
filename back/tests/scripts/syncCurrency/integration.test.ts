import axios from 'axios';
import { syncCurrency } from '../../../src/scripts/syncCurrency/script';
import { RawCurrency } from '../../../src/api/currency/common/services/currencySerializer.service';
import { testDbManager } from '../../helpers/testDb.helper';

const testDb = testDbManager();
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('test get all product API', () => {
  beforeAll(async () => {
    await testDb.connect();
  });

  beforeEach(async () => {
    await testDb.clear();
  });

  afterAll(async () => {
    await testDb.disconnect();
  });
  it('should save new currencies', async () => {
    const response: RawCurrency[] = [
      {
        country: 'Royaume-Uni',
        currency: 'Livre sterling',
        isoA3Code: 'GBP',
        isoA2Code: 'GB',
        value: 0.89485,
        comment: null,
      },
      {
        country: 'Espagne',
        currency: 'Euro',
        isoA3Code: 'EUR',
        isoA2Code: 'ES',
        value: 1,
        comment: 'Euro: Egalement valable pour Andorre (AD).',
      },
    ];
    mockedAxios.get.mockResolvedValueOnce({ data: response });

    await syncCurrency();

    const currencies = await testDb.getCurrencies();

    expect(currencies).toMatchObject([
      {
        id: 'GBP',
        name: 'Livre sterling',
        value: 0.89485,
        updateDate: expect.any(Date),
      },
      {
        id: 'EUR',
        name: 'Euro',
        value: 1,
        updateDate: expect.any(Date),
        comment: 'Euro: Egalement valable pour Andorre (AD).',
      },
    ]);
  });
});
