/* eslint-disable @typescript-eslint/unbound-method */
import { userRepositoryMock } from '../../../mocks/user.repository.mock';
import { userEntityFactory } from '../../../helpers/factories/user.factory';
import service from '../../../../src/api/authentication/askEmailValidation/service';
import { clearEventEmitterMock, eventEmitterMock } from '../../../mocks/eventEmitter.mock';
import { loggerMock } from '../../../mocks/logger.mock';
import userNotFoundError from '../../../../src/api/common/errors/userNotFound.error';
import userBlockedError from '../../../../src/api/common/errors/userBlocked.error';
import userAlreadyEnabledError from '../../../../src/api/common/errors/userAlreadyEnabled.error';

const mailerMock = jest.fn();

describe('askEmailValidation service', () => {
  beforeEach(() => {
    clearEventEmitterMock();
  });

  it('should ask for validate email correctly', async () => {
    const user = userEntityFactory({ enabled: false });
    const userRepository = userRepositoryMock({ getOneById: user });

    await service({
      userId: user.id,
      userRepository,
      mailer: mailerMock,
      eventEmitter: eventEmitterMock,
      logger: loggerMock,
    });

    expect(userRepository.getOneById).toBeCalledWith(user.id);
    expect(eventEmitterMock.emitSendEmailValidateAccount.mock.calls.length).toBe(1);
  });
  it('should return error - user not found', async () => {
    const userRepository = userRepositoryMock({ getOneById: undefined });

    await expect(
      service({
        userId: '12',
        userRepository,
        mailer: mailerMock,
        eventEmitter: eventEmitterMock,
        logger: loggerMock,
      }),
    ).rejects.toMatchObject(userNotFoundError());

    expect(userRepository.getOneById).toBeCalledWith('12');
    expect(eventEmitterMock.emitSendEmailValidateAccount.mock.calls.length).toBe(0);
  });
  it('should return error - user blocked', async () => {
    const user = userEntityFactory({ blocked: true, enabled: false });
    const userRepository = userRepositoryMock({ getOneById: user });

    await expect(
      service({
        userId: '12',
        userRepository,
        mailer: mailerMock,
        eventEmitter: eventEmitterMock,
        logger: loggerMock,
      }),
    ).rejects.toMatchObject(userBlockedError());

    expect(userRepository.getOneById).toBeCalledWith('12');
    expect(eventEmitterMock.emitSendEmailValidateAccount.mock.calls.length).toBe(0);
  });
  it('should return error - user already enabled', async () => {
    const user = userEntityFactory({ enabled: true });
    const userRepository = userRepositoryMock({ getOneById: user });

    await expect(
      service({
        userId: '12',
        userRepository,
        mailer: mailerMock,
        eventEmitter: eventEmitterMock,
        logger: loggerMock,
      }),
    ).rejects.toMatchObject(userAlreadyEnabledError());

    expect(userRepository.getOneById).toBeCalledWith('12');
    expect(eventEmitterMock.emitSendEmailValidateAccount.mock.calls.length).toBe(0);
  });
});
