import axios from 'axios';
import { service } from '../../../src/scripts/syncCurrency/service';
import { RawCurrency } from '../../../src/scripts/syncCurrency/services/currencySerializer.service';
import { currencyRepositoryMock } from '../../mocks/currency.repository.mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('syncCurrencyService', () => {
  test('it should sync currency', async () => {
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

    const currencyRepository = currencyRepositoryMock({});

    await service(currencyRepository);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockedAxios.get).toBeCalled();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(currencyRepository.saveAll).toBeCalledWith([
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
  test('it should not sync currency - empty array', async () => {
    const response: RawCurrency[] = [];

    mockedAxios.get.mockResolvedValueOnce({ data: response });

    const currencyRepository = currencyRepositoryMock({});

    await service(currencyRepository);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockedAxios.get).toBeCalled();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(currencyRepository.saveAll).not.toBeCalled();
  });
});
