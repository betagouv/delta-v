import { CustomEventEmitterInterface } from '../../../core/eventManager/eventManager';
import { User } from '../../../entities/user.entity';
import { UserRepositoryInterface } from '../../../repositories/user.repository';
import userAlreadyEnabledError from '../../common/errors/userAlreadyEnabled.error';
import userBlockedError from '../../common/errors/userBlocked.error';
import userNotFoundError from '../../common/errors/userNotFound.error';
import { sendEventValidationEmailToken } from '../common/services/sendValidationEmail.service';

interface IValidationEmailServiceOptions {
  userId: string;
  userRepository: UserRepositoryInterface;
  eventEmitter: CustomEventEmitterInterface;
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
}: IValidationEmailServiceOptions): Promise<void> => {
  const user = await getAndCheckUser(userId, userRepository);

  await sendEventValidationEmailToken({ user, eventEmitter });
};
