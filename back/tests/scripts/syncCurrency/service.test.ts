import fetchMock from 'jest-fetch-mock';
import { service } from '../../../src/scripts/syncCurrency/service';
import { RawCurrency } from '../../../src/scripts/syncCurrency/services/currencySerializer.service';
import { currencyRepositoryMock } from '../../mocks/currency.repository.mock';

describe('syncCurrencyService', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
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

    fetchMock.mockResponseOnce(JSON.stringify(response));

    const currencyRepository = currencyRepositoryMock();

    await service(currencyRepository);

    expect(fetchMock.call.length).toEqual(1);
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

    fetchMock.mockResponseOnce(JSON.stringify(response));

    const currencyRepository = currencyRepositoryMock();

    await service(currencyRepository);

    expect(fetchMock.call.length).toEqual(1);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(currencyRepository.saveAll).not.toBeCalled();
  });
});
