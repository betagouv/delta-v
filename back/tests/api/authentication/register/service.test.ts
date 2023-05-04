/* eslint-disable @typescript-eslint/unbound-method */
import { userRepositoryMock } from '../../../mocks/user.repository.mock';
import { userEntityFactory } from '../../../helpers/factories/user.factory';
import service from '../../../../src/api/authentication/register/service';
import { eventEmitterMock } from '../../../mocks/eventEmitter.mock';
import { loggerMock } from '../../../mocks/logger.mock';
import userAlreadyExistError from '../../../../src/api/common/errors/userAlreadyExist.error';

const mailerMock = jest.fn();

describe('register service', () => {
  it('should register correctly', async () => {
    const userRepository = userRepositoryMock({});
    const email = 'test@gmail.com';

    await service({
      email,
      password: 'password',
      userRepository,
      mailer: mailerMock,
      logger: loggerMock,
      eventEmitter: eventEmitterMock,
    });

    expect(userRepository.getOneByEmail).toBeCalledWith(email);
    expect(userRepository.createUser).toBeCalled();
  });
  it('should register correctly', async () => {
    const user = userEntityFactory();
    console.log(user);

    const userRepository = userRepositoryMock({ getOneByEmail: user });

    await expect(
      service({
        email: user.email,
        password: user.password,
        userRepository,
        mailer: mailerMock,
        logger: loggerMock,
        eventEmitter: eventEmitterMock,
      }),
    ).rejects.toMatchObject(userAlreadyExistError());

    expect(userRepository.getOneByEmail).toBeCalledWith(user.email);
    expect(userRepository.createUser).not.toBeCalled();
  });
});
