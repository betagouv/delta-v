/* eslint-disable @typescript-eslint/unbound-method */
import { userRepositoryMock } from '../../../mocks/user.repository.mock';
import { userEntityFactory } from '../../../helpers/factories/user.factory';
import service from '../../../../src/api/authentication/askResetPassword/service';
import { clearEventEmitterMock, eventEmitterMock } from '../../../mocks/eventEmitter.mock';

describe('askResetPassword service', () => {
  beforeEach(() => {
    clearEventEmitterMock();
  });

  it('should ask for reset password correctly', async () => {
    const user = userEntityFactory();
    const userRepository = userRepositoryMock({ getOneByEmail: user });

    await service({
      email: user.email,
      userRepository,
      eventEmitter: eventEmitterMock,
    });

    expect(userRepository.getOneByEmail).toBeCalledWith(user.email);
    expect(eventEmitterMock.emitSendEmail.mock.calls.length).toBe(1);
  });
  it('should return success - user not found', async () => {
    const user = userEntityFactory();
    const userRepository = userRepositoryMock({ getOneByEmail: undefined });

    await service({
      email: user.email,
      userRepository,
      eventEmitter: eventEmitterMock,
    });

    expect(userRepository.getOneByEmail).toBeCalledWith(user.email);
    expect(eventEmitterMock.emitSendEmail.mock.calls.length).toBe(0);
  });
  it('should return success - user blocked', async () => {
    const user = userEntityFactory({ blocked: true });
    const userRepository = userRepositoryMock({ getOneByEmail: user });

    await service({
      email: user.email,
      userRepository,
      eventEmitter: eventEmitterMock,
    });

    expect(userRepository.getOneByEmail).toBeCalledWith(user.email);
    expect(eventEmitterMock.emitSendEmail.mock.calls.length).toBe(0);
  });
  it('should return success - user not enabled', async () => {
    const user = userEntityFactory({ enabled: false });
    const userRepository = userRepositoryMock({ getOneByEmail: user });

    await service({
      email: user.email,
      userRepository,
      eventEmitter: eventEmitterMock,
    });

    expect(userRepository.getOneByEmail).toBeCalledWith(user.email);
    expect(eventEmitterMock.emitSendEmail.mock.calls.length).toBe(0);
  });
});
