import { CustomEventEmitterInterface } from '../../../../core/eventManager/eventManager';
import { generateValidationToken } from '../../../../core/jwt/generateToken';
import { User } from '../../../../entities/user.entity';
import { config } from '../../../../loader/config';
import { buildAskEmailValidationUrl } from '../../../../utils/frontUrls.util';
import { buildAskEmailValidationEmailRenderer } from '../../askEmailValidation/emailRenderer';

export interface SaveAndSendValidationEmailTokenOptions {
  user: User;
  eventEmitter: CustomEventEmitterInterface;
}

export const sendEventValidationEmailToken = async ({
  user,
  eventEmitter,
}: SaveAndSendValidationEmailTokenOptions): Promise<void> => {
  const token = await generateValidationToken({ userId: user.id, email: user.email });

  const askEmailValidationHtml = await buildAskEmailValidationEmailRenderer({
    siteUrl: config.URL_FRONTEND,
    emailVerificationUrl: buildAskEmailValidationUrl(token),
  });

  eventEmitter.emitSendEmail({
    to: user.email,
    html: askEmailValidationHtml,
    subject: 'Veuillez valider votre email en cliquant sur le lien',
  });
};
