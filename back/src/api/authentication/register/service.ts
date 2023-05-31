import { v4 as uuid4 } from 'uuid';
import { User } from '../../../entities/user.entity';
import { UserRepositoryInterface } from '../../../repositories/user.repository';
import userAlreadyExistError from '../../common/errors/userAlreadyExist.error';
import { hashPassword } from '../common/services/password.service';
import { CustomEventEmitterInterface } from '../../../core/eventManager/eventManager';
import { sendEventValidationEmailToken } from '../common/services/sendValidationEmail.service';

interface ILoginServiceOptions {
  email: string;
  password: string;
  userRepository: UserRepositoryInterface;
  eventEmitter: CustomEventEmitterInterface;
}

export default async ({
  email,
  password,
  userRepository,
  eventEmitter,
}: ILoginServiceOptions): Promise<void> => {
  const existingUser = await userRepository.getOneByEmail(email);

  if (existingUser) {
    throw userAlreadyExistError();
  }

  const hashedPassword = await hashPassword(password);

  const user: User = {
    id: uuid4(),
    email,
    password: hashedPassword,
    blocked: false,
    enabled: false,
  };

  await userRepository.createUser(user);

  await sendEventValidationEmailToken({ user, eventEmitter });
};
