/* eslint-disable @typescript-eslint/unbound-method */
import { userRepositoryMock } from '../../../mocks/user.repository.mock';
import { userEntityFactory } from '../../../helpers/factories/user.factory';
import { hashPassword } from '../../../../src/api/authentication/common/services/password.service';
import { service } from '../../../../src/api/authentication/login/service';
import badCredentialsError from '../../../../src/api/common/errors/badCredentials.error';
import userBlockedError from '../../../../src/api/common/errors/userBlocked.error';
import userNotEnabledError from '../../../../src/api/common/errors/userNotEnabled.error';

describe('login service', () => {
  it('should login correctly', async () => {
    const password = 'password';
    const hashedPassword = await hashPassword(password);
    const user = userEntityFactory({ password: hashedPassword });
    const userRepository = userRepositoryMock({ getOneByEmail: user });

    const response = await service({
      email: user.email,
      password,
      userRepository,
    });

    expect(response.accessToken).toBeDefined();
    expect(response.refreshToken).toBeDefined();
    expect(userRepository.getOneByEmail).toBeCalledWith(user.email);
  });

  it('should throw 401 - email not found', async () => {
    const userRepository = userRepositoryMock({});

    await expect(
      service({
        email: 'email@gmail.com',
        password: 'password',
        userRepository,
      }),
    ).rejects.toMatchObject(badCredentialsError());
  });

  it('should throw 401 - bad password', async () => {
    const goodPassword = 'good_password';
    const badPassword = 'bad_password';
    const user = userEntityFactory({ password: goodPassword });
    const userRepository = userRepositoryMock({ getOneByEmail: user });

    await expect(
      service({
        email: user.email,
        password: badPassword,
        userRepository,
      }),
    ).rejects.toMatchObject(badCredentialsError());
  });

  it('should throw 401 - user blocked', async () => {
    const user = userEntityFactory({ blocked: true });
    const userRepository = userRepositoryMock({ getOneByEmail: user });

    await expect(
      service({
        email: user.email,
        password: user.password,
        userRepository,
      }),
    ).rejects.toMatchObject(userBlockedError());
  });

  it('should throw 401 - user not enabled', async () => {
    const user = userEntityFactory({ enabled: false });
    const userRepository = userRepositoryMock({ getOneByEmail: user });

    await expect(
      service({
        email: user.email,
        password: user.password,
        userRepository,
      }),
    ).rejects.toMatchObject(userNotEnabledError());
  });
});
