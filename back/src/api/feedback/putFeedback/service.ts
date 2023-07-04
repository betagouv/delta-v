import { CustomEventEmitterInterface } from '../../../core/eventManager/eventManager';
import { Feedback } from '../../../entities/feedback.entity';
import config from '../../../loader/config';
import { FeedbackRepositoryInterface } from '../../../repositories/feedback.repository';

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

  eventEmitter.emitSendEmail({
    to: config.WHITE_LIST_AGENT_EMAIL,
    html: `Email message de l'agent: ${email} <br/> Message: ${comment}`,
    subject: 'Veuillez répondre à ce message',
  });
};
