import { ErrorCodes } from '../../../../../src/api/common/enums/errorCodes.enum';
import { getCurrencies } from '../../../../../src/api/simulator/services/currencies/getCurrencies.service';
import { IAppError } from '../../../../../src/core/buildError';
import { HttpStatuses } from '../../../../../src/core/httpStatuses';
import { currencyEntityFactory } from '../../../../helpers/factories/currency.factory';
import { currencyRepositoryMock } from '../../../../mocks/currency.repository.mock';

describe('test getCurrencies', () => {
  it('should return list of currencies', async () => {
    const currencyIds = ['EUR', 'USD', 'RUB'];
    const currencyRepository = currencyRepositoryMock({
      getManyByIds: [
        currencyEntityFactory({ id: currencyIds[0] }),
        currencyEntityFactory({ id: currencyIds[1] }),
        currencyEntityFactory({ id: currencyIds[2] }),
      ],
    });

    const currencies = await getCurrencies({
      currencyIds,
      currencyRepository,
    });

    expect(currencies).toHaveLength(3);
    expect(currencies.find((currency) => currency.id === currencyIds[0])).toBeDefined();
    expect(currencies.find((currency) => currency.id === currencyIds[1])).toBeDefined();
    expect(currencies.find((currency) => currency.id === currencyIds[2])).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(currencyRepository.getManyByIds).toHaveBeenCalledWith(currencyIds);
  });
  it('should throw error, missing currency', async () => {
    const currencyIds = ['EUR', 'USD', 'RUB'];
    const currencyRepository = currencyRepositoryMock({
      getManyByIds: [
        currencyEntityFactory({ id: currencyIds[0] }),
        currencyEntityFactory({ id: currencyIds[2] }),
      ],
    });

    expect.assertions(2);

    try {
      await getCurrencies({
        currencyIds,
        currencyRepository,
      });
    } catch (error) {
      const formattedError = error as IAppError;
      expect(formattedError.code).toEqual(ErrorCodes.CURRENCY_NOT_FOUND);
      expect(formattedError.statusCode).toEqual(HttpStatuses.NOT_FOUND);
    }
  });
});
