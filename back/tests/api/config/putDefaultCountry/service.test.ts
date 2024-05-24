/* eslint-disable @typescript-eslint/unbound-method */
import { faker } from '@faker-js/faker';
import { userEntityFactory } from '../../../helpers/factories/user.factory';
import { configEntityFactory } from '../../../helpers/factories/config.factory';
import { userRepositoryMock } from '../../../mocks/user.repository.mock';
import { configRepositoryMock } from '../../../mocks/config.repository.mock';
import { service } from '../../../../src/api/config/putDefaultCountry/service';
import { Alpha2CodeEnum } from '../../../../src/utils/country.util';
import userNotFoundError from '../../../../src/api/common/errors/userNotFound.error';

describe('putDefaultCountry service', () => {
  it('should put default country with success', async () => {
    const user = userEntityFactory({});
    const config = configEntityFactory({ userId: user.id });
    const userRepository = userRepositoryMock({ getOneById: user });
    const configRepository = configRepositoryMock({ getOne: config });
    const newDefaultCountry = faker.helpers.enumValue(Alpha2CodeEnum);

    await service({
      userId: user.id,
      country: newDefaultCountry,
      userRepository,
      configRepository,
    });

    expect(configRepository.putOne).toHaveBeenCalledWith({
      userId: user.id,
      defaultCountry: newDefaultCountry,
    });
  });

  it('should throw error - user not found', async () => {
    const user = userEntityFactory({});
    const config = configEntityFactory({ userId: user.id });
    const userRepository = userRepositoryMock({ getOneById: null });
    const configRepository = configRepositoryMock({ getOne: config });
    const newDefaultCountry = faker.helpers.enumValue(Alpha2CodeEnum);

    await expect(
      service({
        userId: user.id,
        country: newDefaultCountry,
        userRepository,
        configRepository,
      }),
    ).rejects.toThrow(userNotFoundError());
  });
});
