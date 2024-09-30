/* eslint-disable @typescript-eslint/unbound-method */
import { faker } from '@faker-js/faker';
import { userRepositoryMock } from '../../../mocks/user.repository.mock';
import { userEntityFactory } from '../../../helpers/factories/user.factory';
import { service } from '../../../../src/api/authentication/refresh/service';
import userBlockedError from '../../../../src/api/common/errors/userBlocked.error';
import userNotEnabledError from '../../../../src/api/common/errors/userNotEnabled.error';
import { generateAccessToken, generateRefreshToken } from '../../../../src/core/jwt/generateToken';
import invalidTokenError from '../../../../src/api/common/errors/invalidToken.error';

describe('refresh service', () => {
  it('should refresh correctly', async () => {
    const user = userEntityFactory({});
    const userRepository = userRepositoryMock({ getOneById: user });
    const accessToken = await generateAccessToken({
      email: user.email,
      userId: user.id,
      isAgent: true,
      name: '',
      lastName: '',
    });
    const refreshToken = await generateRefreshToken({ email: user.email, userId: user.id });

    const response = await service({
      accessToken,
      refreshToken,
      userRepository,
    });

    expect(response.accessToken).toBeDefined();
    expect(response.refreshToken).toBeDefined();
    expect(userRepository.getOneById).toBeCalledWith(user.id);
  });

  it('should throw 401 - bad access token', async () => {
    const user = userEntityFactory({});
    const userRepository = userRepositoryMock({ getOneById: undefined });
    const accessToken = await generateAccessToken({
      email: user.email,
      userId: faker.string.uuid(),
      isAgent: true,
      name: '',
      lastName: '',
    });
    const refreshToken = await generateRefreshToken({ email: user.email, userId: user.id });

    await expect(
      service({
        accessToken,
        refreshToken,
        userRepository,
      }),
    ).rejects.toMatchObject(invalidTokenError());
  });

  it('should throw 401 - bad refresh token', async () => {
    const user = userEntityFactory({});
    const userRepository = userRepositoryMock({ getOneById: undefined });
    const accessToken = await generateAccessToken({
      email: user.email,
      userId: user.id,
      isAgent: true,
      name: '',
      lastName: '',
    });
    const refreshToken = await generateRefreshToken({
      email: user.email,
      userId: faker.string.uuid(),
    });

    await expect(
      service({
        accessToken,
        refreshToken,
        userRepository,
      }),
    ).rejects.toMatchObject(invalidTokenError());
  });

  it('should throw 401 - user blocked', async () => {
    const user = userEntityFactory({ blocked: true });
    const userRepository = userRepositoryMock({ getOneById: user });
    const accessToken = await generateAccessToken({
      email: user.email,
      userId: user.id,
      isAgent: true,
      name: '',
      lastName: '',
    });
    const refreshToken = await generateRefreshToken({ email: user.email, userId: user.id });

    await expect(
      service({
        accessToken,
        refreshToken,
        userRepository,
      }),
    ).rejects.toMatchObject(userBlockedError());
  });

  it('should throw 401 - user not enabled', async () => {
    const user = userEntityFactory({ enabled: false });
    const userRepository = userRepositoryMock({ getOneById: user });
    const accessToken = await generateAccessToken({
      email: user.email,
      userId: user.id,
      isAgent: true,
      name: '',
      lastName: '',
    });
    const refreshToken = await generateRefreshToken({ email: user.email, userId: user.id });

    await expect(
      service({
        accessToken,
        refreshToken,
        userRepository,
      }),
    ).rejects.toMatchObject(userNotEnabledError());
  });
});
