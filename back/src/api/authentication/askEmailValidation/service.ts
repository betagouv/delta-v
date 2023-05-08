import { CustomEventEmitterInterface } from '../../../core/eventManager/eventManager';
import { ILogger } from '../../../core/logger';
import { MailerFunction } from '../../../core/mailer';
import { User } from '../../../entities/user.entity';
import { UserRepositoryInterface } from '../../../repositories/user.repository';
import userAlreadyEnabledError from '../../common/errors/userAlreadyEnabled.error';
import userBlockedError from '../../common/errors/userBlocked.error';
import userNotFoundError from '../../common/errors/userNotFound.error';

interface IValidationEmailServiceOptions {
  userId: string;
  userRepository: UserRepositoryInterface;
  eventEmitter: CustomEventEmitterInterface;
  mailer: MailerFunction;
  logger: ILogger;
}

const getAndCheckUser = async (
  userId: string,
  userRepository: UserRepositoryInterface,
): Promise<User> => {
  const user = await userRepository.getOneById(userId);
  if (!user) {
    throw userNotFoundError();
  }
  if (user.blocked) {
    throw userBlockedError();
  }
  if (user.enabled) {
    throw userAlreadyEnabledError();
  }

  return user;
};

export default async ({
  userId,
  userRepository,
  eventEmitter,
  mailer,
  logger,
}: IValidationEmailServiceOptions): Promise<void> => {
  const user = await getAndCheckUser(userId, userRepository);

  eventEmitter.emitSendEmailValidateAccount({ user, mailer, logger });
};
