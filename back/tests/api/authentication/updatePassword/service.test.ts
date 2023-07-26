/* eslint-disable @typescript-eslint/unbound-method */
import { userRepositoryMock } from '../../../mocks/user.repository.mock';
import { userEntityFactory } from '../../../helpers/factories/user.factory';
import { hashPassword } from '../../../../src/api/authentication/common/services/password.service';
import service from '../../../../src/api/authentication/updatePassword/service';
import userBlockedError from '../../../../src/api/common/errors/userBlocked.error';
import userNotEnabledError from '../../../../src/api/common/errors/userNotEnabled.error';
import { eventEmitterMock } from '../../../mocks/eventEmitter.mock';
import userNotFoundError from '../../../../src/api/common/errors/userNotFound.error';
import notGoodPasswordError from '../../../../src/api/common/errors/notGoodPassword.error';

describe('updatePassword service', () => {
  it('should updatePassword correctly', async () => {
    const currentPassword = 'password';
    const newPassword = 'password2';
    const hashedPassword = await hashPassword(currentPassword);
    const user = userEntityFactory({ password: hashedPassword });
    const userRepository = userRepositoryMock({ getOneById: user });

    await service({
      userId: user.id,
      currentPassword,
      newPassword,
      userRepository,
      eventEmitter: eventEmitterMock,
    });

    expect(userRepository.getOneById).toBeCalledWith(user.id);
    expect(userRepository.updateUser).toBeCalledWith(user.id, {
      password: expect.any(String),
    });
  });

  it('should throw 401 - userId not found', async () => {
    const userRepository = userRepositoryMock({});

    await expect(
      service({
        userId: '677ba157-f032-4590-8ef5-da43ef787fba',
        currentPassword: 'password',
        newPassword: 'password2',
        userRepository,
        eventEmitter: eventEmitterMock,
      }),
    ).rejects.toMatchObject(userNotFoundError());
  });

  it('should throw 401 - bad password', async () => {
    const goodPassword = 'good_password';
    const badPassword = 'bad_password';
    const user = userEntityFactory({ password: goodPassword });
    const userRepository = userRepositoryMock({ getOneById: user });

    await expect(
      service({
        userId: user.id,
        currentPassword: badPassword,
        newPassword: goodPassword,
        userRepository,
        eventEmitter: eventEmitterMock,
      }),
    ).rejects.toMatchObject(notGoodPasswordError());
  });

  it('should throw 401 - user blocked', async () => {
    const user = userEntityFactory({ blocked: true });
    const userRepository = userRepositoryMock({ getOneById: user });

    await expect(
      service({
        userId: user.id,
        currentPassword: user.password,
        newPassword: 'password2',
        userRepository,
        eventEmitter: eventEmitterMock,
      }),
    ).rejects.toMatchObject(userBlockedError());
  });

  it('should throw 401 - user not enabled', async () => {
    const user = userEntityFactory({ enabled: false });
    const userRepository = userRepositoryMock({ getOneById: user });

    await expect(
      service({
        userId: user.id,
        currentPassword: user.password,
        newPassword: 'password2',
        userRepository,
        eventEmitter: eventEmitterMock,
      }),
    ).rejects.toMatchObject(userNotEnabledError());
  });
});
