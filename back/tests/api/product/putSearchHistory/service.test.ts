/* eslint-disable @typescript-eslint/unbound-method */

import { faker } from '@faker-js/faker';
import {
  PutSearchProductHistoryServiceOptions,
  service,
} from '../../../../src/api/product/putSearchHistory/service';
import { productRepositoryMock } from '../../../mocks/product.repository.mock';
import { userRepositoryMock } from '../../../mocks/user.repository.mock';
import { searchProductHistoryRepositoryMock } from '../../../mocks/searchProductHistory.repository.mock';
import { productEntityFactory } from '../../../helpers/factories/product.factory';
import { userEntityFactory } from '../../../helpers/factories/user.factory';
import productNotFoundError from '../../../../src/api/common/errors/productNotFound.error';
import userNotFoundError from '../../../../src/api/common/errors/userNotFound.error';

interface PrepareValidContextResponse {
  serviceOptions: PutSearchProductHistoryServiceOptions;
}

const prepareValidContext = (): PrepareValidContextResponse => {
  const product = productEntityFactory({});
  const user = userEntityFactory({});
  const searchValue = faker.commerce.product();
  const productRepository = productRepositoryMock({ getOneById: product });
  const userRepository = userRepositoryMock({ getOneById: user });
  const searchProductHistoryRepository = searchProductHistoryRepositoryMock({ getByAgentId: null });

  const serviceOptions = {
    productId: product.id,
    userId: user.id,
    searchValue,
    productRepository,
    userRepository,
    searchProductHistoryRepository,
  };
  return {
    serviceOptions,
  };
};

describe('put search product history service', () => {
  it('should create or update a search product history with success', async () => {
    const { serviceOptions } = prepareValidContext();

    await service({
      ...serviceOptions,
    });

    expect(serviceOptions.searchProductHistoryRepository.createOne).toHaveBeenCalledWith({
      productId: serviceOptions.productId,
      userId: serviceOptions.userId,
      searchDate: expect.any(Date),
      searchValue: serviceOptions.searchValue,
    });
    expect(serviceOptions.searchProductHistoryRepository.removeOld).toHaveBeenCalledWith(
      serviceOptions.userId,
    );
  });

  it('should return error - product not found', async () => {
    const { serviceOptions } = prepareValidContext();
    const productRepository = productRepositoryMock({ getOneById: null });

    await expect(
      service({
        ...serviceOptions,
        productRepository,
      }),
    ).rejects.toThrow(productNotFoundError());

    expect(serviceOptions.searchProductHistoryRepository.createOne).not.toHaveBeenCalled();
    expect(serviceOptions.searchProductHistoryRepository.removeOld).not.toHaveBeenCalled();
  });

  it('should return error - user not found', async () => {
    const { serviceOptions } = prepareValidContext();
    const userRepository = userRepositoryMock({ getOneById: null });

    await expect(
      service({
        ...serviceOptions,
        userRepository,
      }),
    ).rejects.toThrow(userNotFoundError());

    expect(serviceOptions.searchProductHistoryRepository.createOne).not.toHaveBeenCalled();
    expect(serviceOptions.searchProductHistoryRepository.removeOld).not.toHaveBeenCalled();
  });
});
