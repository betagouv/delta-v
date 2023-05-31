import { CustomEventEmitterInterface } from '../../../../core/eventManager/eventManager';
import { generateValidationToken } from '../../../../core/jwt/generateToken';
import { User } from '../../../../entities/user.entity';
import config from '../../../../loader/config';

export interface SaveAndSendValidationEmailTokenOptions {
  user: User;
  eventEmitter: CustomEventEmitterInterface;
}

export const sendEventValidationEmailToken = async ({
  user,
  eventEmitter,
}: SaveAndSendValidationEmailTokenOptions): Promise<void> => {
  const token = await generateValidationToken({ userId: user.id, email: user.email });
  const urlValidationToken = `${config.URL_FRONTEND}${config.ROUTE_FRONTEND_VALIDATE_ACCOUNT}?token=${token}`;

  eventEmitter.emitSendEmail({
    to: user.email,
    html: `Url email validation : ${urlValidationToken}`,
    subject: 'Veuillez valider votre email en cliquant sur le lien',
  });
};
