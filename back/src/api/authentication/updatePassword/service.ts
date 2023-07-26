import { compare } from 'bcrypt';
import { UserRepositoryInterface } from '../../../repositories/user.repository';
import userNotFoundError from '../../common/errors/userNotFound.error';
import { hashPassword } from '../common/services/password.service';
import { CustomEventEmitterInterface } from '../../../core/eventManager/eventManager';
import { config } from '../../../loader/config';
import { getAndCheckUserById } from '../common/services/getAndCheckUser.service';
import passwordUpdateError from '../../common/errors/passwordUpdate.error';
import NotGoodPasswordError from '../../common/errors/notGoodPassword.error';
import { buildUpdatePasswordEmailRenderer } from './emailRenderer';

export interface IUpdatePasswordServiceOptions {
  userId: string;
  currentPassword: string;
  newPassword: string;
  userRepository: UserRepositoryInterface;
  eventEmitter: CustomEventEmitterInterface;
}

export default async ({
  userId,
  currentPassword,
  newPassword,
  userRepository,
  eventEmitter,
}: IUpdatePasswordServiceOptions): Promise<void> => {
  const user = await getAndCheckUserById({
    userId,
    userRepository,
    error: userNotFoundError(),
  });
  const isGoodPassword = await compare(currentPassword, user.password);

  if (!isGoodPassword) {
    throw NotGoodPasswordError();
  }

  const hashedPassword = await hashPassword(newPassword);

  try {
    await userRepository.updateUser(userId, { password: hashedPassword });

    const updatePasswordHtml = await buildUpdatePasswordEmailRenderer({
      siteUrl: config.URL_FRONTEND,
      emailSAV: config.EMAIL_SAV,
      phoneNumberSAV: config.PHONE_NUMBER_SAV,
    });

    eventEmitter.emitSendEmail({
      to: user.email,
      html: updatePasswordHtml,
      subject: 'Votre mot de passe a été modifié',
    });
  } catch (error) {
    throw passwordUpdateError();
  }
};
