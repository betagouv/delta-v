import { ILogger } from '../../../../core/logger';
import { MailerFunction } from '../../../../core/mailer';
import { User } from '../../../../entities/user.entity';
import { generateValidationToken } from '../../../../core/jwt/generateToken';

export interface SaveAndSendValidationEmailTokenOptions {
  user: User;
  mailer: MailerFunction;
  logger: ILogger;
}

export const sendValidationEmailToken = async ({
  user,
  mailer,
  logger,
}: SaveAndSendValidationEmailTokenOptions): Promise<void> => {
  const urlValidationToken = await generateValidationToken({ userId: user.id, email: user.email });

  try {
    await mailer({
      to: user.email,
      html: `Url email validation : ${urlValidationToken}`,
      subject: 'Veuillez valider votre email en cliquant sur le lien',
    });
  } catch (error) {
    logger.warn({ message: 'Mail could not be sent', context: error });
  }
};
