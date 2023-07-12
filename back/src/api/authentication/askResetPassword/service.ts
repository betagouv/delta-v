import { UserRepositoryInterface } from '../../../repositories/user.repository';
import { CustomEventEmitterInterface } from '../../../core/eventManager/eventManager';
import { generateResetPasswordToken } from '../../../core/jwt/generateToken';
import { config } from '../../../loader/config';

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
  const urlValidationToken = `${config.URL_FRONTEND}${config.ROUTE_FRONTEND_RESET_PASSWORD}?token=${token}`;

  eventEmitter.emitSendEmail({
    to: user.email,
    html: `Url reset password : ${urlValidationToken}`,
    subject: 'Veuillez changer votre mot de passe en cliquant sur le lien',
  });
};
