/* eslint-disable @typescript-eslint/unbound-method */

import { faker } from '@faker-js/faker';
import { searchProductHistoryRepositoryMock } from '../../../mocks/searchProductHistory.repository.mock';
import {
  GetSearchProductHistoryServiceOptions,
  service,
} from '../../../../src/api/product/getSearchHistory/service';
import { searchProductHistoryEntityFactory } from '../../../helpers/factories/searchProductHistory.factory';
import {
  SearchProductHistory,
  SearchProductHistoryEntityInterface,
} from '../../../../src/entities/searchProductHistory.entity';

interface PrepareValidContextResponse {
  serviceOptions: GetSearchProductHistoryServiceOptions;
  searchProductHistoryResult: SearchProductHistory[] | SearchProductHistoryEntityInterface[];
  numberOfSearchHistory: number;
}

const prepareValidContext = (): PrepareValidContextResponse => {
  const userId = faker.string.uuid();

  const numberOfSearchHistory = faker.number.int({ min: 0, max: 10 });

  const searchProductHistoryResult = Array.from({ length: numberOfSearchHistory }, () =>
    searchProductHistoryEntityFactory({ productId: faker.string.uuid(), userId }),
  );

  const searchProductHistoryRepository = searchProductHistoryRepositoryMock({
    getByAgentId: searchProductHistoryResult,
  });

  const serviceOptions = {
    userId,
    searchProductHistoryRepository,
  };
  return {
    serviceOptions,
    searchProductHistoryResult,
    numberOfSearchHistory,
  };
};

describe('get search product history service', () => {
  it('should get all search product history for current user with success', async () => {
    const { serviceOptions, searchProductHistoryResult, numberOfSearchHistory } =
      prepareValidContext();

    const result = await service({
      ...serviceOptions,
    });

    expect(result).toMatchObject(searchProductHistoryResult);
    expect(result.length).toEqual(numberOfSearchHistory);
    expect(serviceOptions.searchProductHistoryRepository.getByAgentId).toHaveBeenCalledWith(
      serviceOptions.userId,
      true,
    );
  });
});
