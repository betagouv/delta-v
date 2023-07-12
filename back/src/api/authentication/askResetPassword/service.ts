import { UserRepositoryInterface } from '../../../repositories/user.repository';
import { CustomEventEmitterInterface } from '../../../core/eventManager/eventManager';
import { generateResetPasswordToken } from '../../../core/jwt/generateToken';
import { config } from '../../../loader/config';
import { buildAskResetPasswordUrl } from '../../../utils/frontUrls.enum';
import { buildAskResetPasswordEmailRenderer } from './emailRenderer';

interface IValidationEmailServiceOptions {
  email: string;
  userRepository: UserRepositoryInterface;
  eventEmitter: CustomEventEmitterInterface;
}

export default async ({
  email,
  userRepository,
  eventEmitter,
}: IValidationEmailServiceOptions): Promise<void> => {
  const user = await userRepository.getOneByEmail(email);
  if (!user || user.blocked) {
    return;
  }

  const token = await generateResetPasswordToken({
    userId: user.id,
    email: user.email,
  });

  const askResetPasswordHtml = await buildAskResetPasswordEmailRenderer({
    siteUrl: config.URL_FRONTEND,
    email: user.email,
    emailAskResetPasswordUrl: buildAskResetPasswordUrl(token),
  });

  eventEmitter.emitSendEmail({
    to: user.email,
    html: askResetPasswordHtml,
    subject: 'Veuillez changer votre mot de passe en cliquant sur le lien',
  });
};
