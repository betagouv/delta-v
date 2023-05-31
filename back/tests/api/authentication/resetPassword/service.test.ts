/* eslint-disable @typescript-eslint/unbound-method */
import { userRepositoryMock } from '../../../mocks/user.repository.mock';
import { userEntityFactory } from '../../../helpers/factories/user.factory';
import service from '../../../../src/api/authentication/resetPassword/service';
import invalidTokenError from '../../../../src/api/common/errors/invalidToken.error';
import userBlockedError from '../../../../src/api/common/errors/userBlocked.error';
import userNotEnabledError from '../../../../src/api/common/errors/userNotEnabled.error';
import userNotFoundError from '../../../../src/api/common/errors/userNotFound.error';
import { generateResetPasswordToken } from '../../../../src/core/jwt/generateToken';

describe('reset password service', () => {
  it('should reset password correctly', async () => {
    const password = 'password';
    const user = userEntityFactory({ id: '8e339c8f-2187-46a9-8c30-aa15d3ebc330' });
    const userRepository = userRepositoryMock({ getOneById: user });
    const token = await generateResetPasswordToken({ email: user.email, userId: user.id });

    await service({
      token,
      password,
      userRepository,
    });

    expect(userRepository.getOneById).toBeCalledWith(user.id);
    expect(userRepository.updateUser).toBeCalled();
  });
  it('should not reset password - bad token', async () => {
    const token = '9a0948fe-df90-4141-87e4-995ab7b790cf';
    const password = 'password';
    const user = userEntityFactory();
    const userRepository = userRepositoryMock({ getOneById: user });

    await expect(
      service({
        token,
        password,
        userRepository,
      }),
    ).rejects.toMatchObject(invalidTokenError());

    expect(userRepository.getOneById).not.toBeCalled();
    expect(userRepository.updateUser).not.toBeCalled();
  });
  it('should not reset password - user not found', async () => {
    const password = 'password';
    const userRepository = userRepositoryMock({ getOneById: undefined });
    const token = await generateResetPasswordToken({
      email: 'test@test.fr',
      userId: '14e30cd5-6867-4a79-b37a-895853e64214',
    });

    await expect(
      service({
        token,
        password,
        userRepository,
      }),
    ).rejects.toMatchObject(userNotFoundError());
    expect(userRepository.getOneById).toBeCalled();
    expect(userRepository.updateUser).not.toBeCalled();
  });
  it('should not reset password - user blocked', async () => {
    const password = 'password';
    const user = userEntityFactory({ blocked: true });
    const userRepository = userRepositoryMock({ getOneById: user });
    const token = await generateResetPasswordToken({ email: user.email, userId: user.id });

    await expect(
      service({
        token,
        password,
        userRepository,
      }),
    ).rejects.toMatchObject(userBlockedError());
    expect(userRepository.getOneById).toBeCalled();
    expect(userRepository.updateUser).not.toBeCalled();
  });
  it('should not reset password - user not enabled', async () => {
    const password = 'password';
    const user = userEntityFactory({ enabled: false });
    const userRepository = userRepositoryMock({ getOneById: user });
    const token = await generateResetPasswordToken({ email: user.email, userId: user.id });

    await expect(
      service({
        token,
        password,
        userRepository,
      }),
    ).rejects.toMatchObject(userNotEnabledError());
    expect(userRepository.getOneById).toBeCalled();
    expect(userRepository.updateUser).not.toBeCalled();
  });
});
