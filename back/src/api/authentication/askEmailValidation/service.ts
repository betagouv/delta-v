import { CustomEventEmitterInterface } from '../../../core/eventManager/eventManager';
import { User } from '../../../entities/user.entity';
import { UserRepositoryInterface } from '../../../repositories/user.repository';
import userAlreadyEnabledError from '../../common/errors/userAlreadyEnabled.error';
import userBlockedError from '../../common/errors/userBlocked.error';
import userNotFoundError from '../../common/errors/userNotFound.error';
import { sendEventValidationEmailToken } from '../common/services/sendValidationEmail.service';

interface IValidationEmailServiceOptions {
  email?: string;
  userRepository: UserRepositoryInterface;
  eventEmitter: CustomEventEmitterInterface;
}

const getAndCheckUser = async (
  userRepository: UserRepositoryInterface,
  email?: string,
): Promise<User> => {
  if (!email) {
    throw userNotFoundError();
  }

  const user = await userRepository.getOneByEmail(email);
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
  email,
  userRepository,
  eventEmitter,
}: IValidationEmailServiceOptions): Promise<void> => {
  const user = await getAndCheckUser(userRepository, email);

  await sendEventValidationEmailToken({ user, eventEmitter });
};
