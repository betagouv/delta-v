import { v4 as uuid4 } from 'uuid';
import { ILogger } from '../../../core/logger';
import { MailerFunction } from '../../../core/mailer';
import { User } from '../../../entities/user.entity';
import { UserRepositoryInterface } from '../../../repositories/user.repository';
import userAlreadyExistError from '../../common/errors/userAlreadyExist.error';
import { hashPassword } from '../common/services/password.service';
import { CustomEventEmitterInterface } from '../../../core/eventManager/eventManager';

interface ILoginServiceOptions {
  email: string;
  password: string;
  userRepository: UserRepositoryInterface;
  mailer: MailerFunction;
  eventEmitter: CustomEventEmitterInterface;
  logger: ILogger;
}

export default async ({
  email,
  password,
  userRepository,
  mailer,
  eventEmitter,
  logger,
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

  eventEmitter.emitSendEmailValidateAccount({ user, mailer, logger });
};
