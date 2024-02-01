import { CustomEventEmitterInterface } from '../../../core/eventManager/eventManager';
import { Feedback } from '../../../entities/feedback.entity';
import { config } from '../../../loader/config';
import { FeedbackRepositoryInterface } from '../../../repositories/feedback.repository';
import { buildPutFeedbackEmailRenderer } from './emailRenderer';
import { IS3Service } from './services/s3.service';

interface FeedbackOptions {
  feedbackId: string;
  comment: string;
  email: string;
  userId: string;
  file?: Express.Multer.File;
  feedbackRepository: FeedbackRepositoryInterface;
  eventEmitter: CustomEventEmitterInterface;
  s3Service: IS3Service;
}

const getPhotosUrl = async (
  s3Service: IS3Service,
  file?: Express.Multer.File,
): Promise<string | undefined> => {
  if (!file) {
    return undefined;
  }
  const fileName = `file-${Date.now()}.${file.originalname.split('.').reverse()[0]}`;

  const photoUrl = await s3Service.upload({ buffer: file.buffer, fileName });
  return photoUrl.Location;
};

export const service = async ({
  feedbackId,
  comment,
  email,
  userId,
  file,
  feedbackRepository,
  eventEmitter,
  s3Service,
}: FeedbackOptions): Promise<void> => {
  try {
    const feedbackPhotoUrl = await getPhotosUrl(s3Service, file);

    const feedback: Feedback = {
      id: feedbackId,
      comment,
      email,
      userId,
      pictureUrl: feedbackPhotoUrl,
    };

    await feedbackRepository.createOne(feedback);

    const putFeedbackHtml = await buildPutFeedbackEmailRenderer({
      siteUrl: config.URL_FRONTEND,
      agentEmail: email,
      comment,
      agentId: userId,
    });

    eventEmitter.emitSendEmail({
      to: config.FEEDBACK_RECEIVER_EMAIL_LIST,
      html: putFeedbackHtml,
      subject: 'Veuillez répondre à ce message',
      attachments: file ? [{ filename: file.originalname, content: file.buffer }] : undefined,
    });
  } catch (error) {
    console.log(error);
  }
};
