/* eslint-disable @typescript-eslint/unbound-method */
import { faker } from '@faker-js/faker';
import { userRepositoryMock } from '../../../mocks/user.repository.mock';
import { userEntityFactory } from '../../../helpers/factories/user.factory';
import service from '../../../../src/api/authentication/askEmailValidation/service';
import { clearEventEmitterMock, eventEmitterMock } from '../../../mocks/eventEmitter.mock';
import userNotFoundError from '../../../../src/api/common/errors/userNotFound.error';
import userBlockedError from '../../../../src/api/common/errors/userBlocked.error';
import userAlreadyEnabledError from '../../../../src/api/common/errors/userAlreadyEnabled.error';
import emailNotProvidedError from '../../../../src/api/common/errors/emailNotProvided.error';

describe('askEmailValidation service', () => {
  beforeEach(() => {
    clearEventEmitterMock();
  });

  it('should ask for validate email correctly', async () => {
    const user = userEntityFactory({ enabled: false });
    const userRepository = userRepositoryMock({ getOneByEmail: user });

    await service({
      email: user.email,
      userRepository,
      eventEmitter: eventEmitterMock,
    });

    expect(userRepository.getOneByEmail).toBeCalledWith(user.email);
    expect(eventEmitterMock.emitSendEmail.mock.calls.length).toBe(1);
  });
  it('should return error - user not found', async () => {
    const userRepository = userRepositoryMock({ getOneByEmail: undefined });
    const email = faker.internet.email();

    await expect(
      service({
        email,
        userRepository,
        eventEmitter: eventEmitterMock,
      }),
    ).rejects.toMatchObject(userNotFoundError());

    expect(userRepository.getOneByEmail).toBeCalledWith(email);
    expect(eventEmitterMock.emitSendEmail.mock.calls.length).toBe(0);
  });
  it('should return error - email not provided', async () => {
    const userRepository = userRepositoryMock({});
    await expect(
      service({
        email: undefined,
        userRepository,
        eventEmitter: eventEmitterMock,
      }),
    ).rejects.toMatchObject(emailNotProvidedError());

    expect(userRepository.getOneByEmail).not.toBeCalled();
    expect(eventEmitterMock.emitSendEmail.mock.calls.length).toBe(0);
  });
  it('should return error - user blocked', async () => {
    const user = userEntityFactory({ blocked: true, enabled: false });
    const userRepository = userRepositoryMock({ getOneByEmail: user });

    await expect(
      service({
        email: user.email,
        userRepository,
        eventEmitter: eventEmitterMock,
      }),
    ).rejects.toMatchObject(userBlockedError());

    expect(userRepository.getOneByEmail).toBeCalledWith(user.email);
    expect(eventEmitterMock.emitSendEmail.mock.calls.length).toBe(0);
  });
  it('should return error - user already enabled', async () => {
    const user = userEntityFactory({ enabled: true });
    const userRepository = userRepositoryMock({ getOneByEmail: user });

    await expect(
      service({
        email: user.email,
        userRepository,
        eventEmitter: eventEmitterMock,
      }),
    ).rejects.toMatchObject(userAlreadyEnabledError());

    expect(userRepository.getOneByEmail).toBeCalledWith(user.email);
    expect(eventEmitterMock.emitSendEmail.mock.calls.length).toBe(0);
  });
});
