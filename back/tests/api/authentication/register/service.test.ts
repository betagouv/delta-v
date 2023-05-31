/* eslint-disable @typescript-eslint/unbound-method */
import { userRepositoryMock } from '../../../mocks/user.repository.mock';
import { userEntityFactory } from '../../../helpers/factories/user.factory';
import service from '../../../../src/api/authentication/register/service';
import { eventEmitterMock } from '../../../mocks/eventEmitter.mock';
import userAlreadyExistError from '../../../../src/api/common/errors/userAlreadyExist.error';

describe('register service', () => {
  it('should register correctly', async () => {
    const userRepository = userRepositoryMock({});
    const email = 'test@gmail.com';

    await service({
      email,
      password: 'password',
      userRepository,
      eventEmitter: eventEmitterMock,
    });

    expect(userRepository.getOneByEmail).toBeCalledWith(email);
    expect(userRepository.createUser).toBeCalled();
  });
  it('should register correctly', async () => {
    const user = userEntityFactory();

    const userRepository = userRepositoryMock({ getOneByEmail: user });

    await expect(
      service({
        email: user.email,
        password: user.password,
        userRepository,
        eventEmitter: eventEmitterMock,
      }),
    ).rejects.toMatchObject(userAlreadyExistError());

    expect(userRepository.getOneByEmail).toBeCalledWith(user.email);
    expect(userRepository.createUser).not.toBeCalled();
  });
});
