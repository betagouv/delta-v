/* eslint-disable @typescript-eslint/unbound-method */
import { faker } from '@faker-js/faker';
import type { Alpha2Code } from 'i18n-iso-countries';
import { userEntityFactory } from '../../../helpers/factories/user.factory';
import { configEntityFactory } from '../../../helpers/factories/config.factory';
import { Alpha2CodeEnum } from '../../../../src/utils/country.util';
import { userRepositoryMock } from '../../../mocks/user.repository.mock';
import { configRepositoryMock } from '../../../mocks/config.repository.mock';
import { service } from '../../../../src/api/config/getDefaultCountry/service';
import userNotFoundError from '../../../../src/api/common/errors/userNotFound.error';

describe('getDefaultCountry service', () => {
  it('should get default country with success', async () => {
    const user = userEntityFactory({});
    const config = configEntityFactory({
      userId: user.id,
      defaultCountry: faker.helpers.enumValue(Alpha2CodeEnum) as Alpha2Code,
    });
    const userRepository = userRepositoryMock({ getOneById: user });
    const configRepository = configRepositoryMock({ getOne: config });

    await service({
      userId: user.id,
      userRepository,
      configRepository,
    });

    expect(configRepository.getOne).toHaveBeenCalledWith(user.id);
  });

  it('should throw error - user not found', async () => {
    const user = userEntityFactory({});
    const config = configEntityFactory({
      userId: user.id,
      defaultCountry: faker.helpers.enumValue(Alpha2CodeEnum) as Alpha2Code,
    });
    const userRepository = userRepositoryMock({ getOneById: null });
    const configRepository = configRepositoryMock({ getOne: config });

    await expect(
      service({
        userId: user.id,
        userRepository,
        configRepository,
      }),
    ).rejects.toThrow(userNotFoundError());
  });
});
