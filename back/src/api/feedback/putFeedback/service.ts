import { CustomEventEmitterInterface } from '../../../core/eventManager/eventManager';
import { Feedback } from '../../../entities/feedback.entity';
import { config } from '../../../loader/config';
import { FeedbackRepositoryInterface } from '../../../repositories/feedback.repository';
import { buildPutFeedbackEmailRenderer } from './emailRenderer';

interface FeedbackOptions {
  feedbackId: string;
  comment: string;
  email: string;
  userId: string;
  feedbackRepository: FeedbackRepositoryInterface;
  eventEmitter: CustomEventEmitterInterface;
}

export const service = async ({
  feedbackId,
  comment,
  email,
  userId,
  feedbackRepository,
  eventEmitter,
}: FeedbackOptions): Promise<void> => {
  const feedback: Feedback = {
    id: feedbackId,
    comment,
    email,
    userId,
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
  });
};
